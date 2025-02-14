// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "../lsp7/LSP7DigitalAsset.sol";

contract Subscription is LSP7DigitalAsset {
    address public recipient;      // Content creator's address
    address public protocolAddress; // Protocol fee recipient address
    uint256 public protocolFee;    // Protocol fee percentage (2%)
    ILSP7DigitalAsset public paymentToken; // Token used for payments

    /// @notice Represents a subscription tier with its properties
    struct SubscriptionTier {
        string name;    // Name of the tier
        uint256 price;  // Price in payment tokens
        bool isActive;  // Whether the tier is currently active
    }

    /// @notice Represents a subscriber's subscription details
    struct Subscriber {
        bool isActive;    // Whether subscription is active
        uint256 expiry;   // Timestamp when subscription expires
        uint256 tierId;   // ID of the subscription tier
    }

    // Mapping from tier ID to tier details
    mapping(uint256 => SubscriptionTier) public tiers;
    uint256 public totalTiers;

    // Mapping from subscriber address to their subscription details
    mapping(address => Subscriber) public subscribers;

    // Events
    event SubscriptionTierCreated(uint256 indexed tierId, string name, uint256 price);
    event SubscriptionTierUpdated(uint256 indexed tierId, string name, uint256 price);
    event SubscriptionTierDeactivated(uint256 indexed tierId);
    event Subscribed(address indexed user, uint256 tierId, uint256 expiry);
    event Unsubscribed(address indexed user);
    event PaymentSent(address indexed user, uint256 amount, uint256 fee);

    // Errors
    error PaymentToCreatorFailed();
    error PaymentToProtocolFailed();
    error InsufficientAllowance();
    error AlreadySubscribed();
    error AllowanceNotZero();
    error InvalidTierPrice();
    error TierNotActive();
    error EmptyTierName();
    error OnlyOwner();

    constructor(
        address _owner,
        string memory _name,
        address _recipient,
        address _protocolAddress,
        address _paymentToken
    ) LSP7DigitalAsset(
        _name,
        "SUBz",
        _owner,
        0,
        true
    ) {
        recipient = _recipient;
        protocolAddress = _protocolAddress;
        paymentToken = ILSP7DigitalAsset(_paymentToken);
    }

    // Override transfer functions to make tokens non-transferable
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount,
        bool force,
        bytes memory data
    ) internal virtual override {
        require(from == address(0) || to == address(0), "Transfers are not allowed");
        super._beforeTokenTransfer(from, to, amount, force, data);
    }

    /// @notice Creates a new subscription tier
    /// @param _name Name of the tier
    /// @param _price Price in payment tokens
    function createTier(
        string memory _name,
        uint256 _price
    ) external onlyOwner {
        // Add input validation
        if (bytes(_name).length == 0) revert EmptyTierName();
        if (_price == 0) revert InvalidTierPrice();

        uint256 tierId = totalTiers++;
        tiers[tierId] = SubscriptionTier({
            name: _name,
            price: _price,
            isActive: true
        });

        emit SubscriptionTierCreated(tierId, _name, _price);
    }

    /// @notice Allows a user to subscribe and processes initial payment
    /// @param _tierId ID of the tier to subscribe to
    function subscribe(uint256 _tierId) external {
        if (!tiers[_tierId].isActive) revert TierNotActive();

        // Add check for existing active subscription
        if (subscribers[msg.sender].isActive && subscribers[msg.sender].expiry > block.timestamp) {
            revert("Already subscribed");
        }

        // Process initial payment
        bool success = _chargeUser(msg.sender, _tierId);
        if (!success) revert PaymentToCreatorFailed();

        // Mint 1 non-divisible token to subscriber
        _mint(msg.sender, 1, true, "");

        uint256 expiry = block.timestamp + 30 days;
        subscribers[msg.sender] = Subscriber({
            isActive: true,
            expiry: expiry,
            tierId: _tierId
        });

        emit Subscribed(msg.sender, _tierId, expiry);
    }

    /**
     * @notice Allows a user to unsubscribe.
     */
    function unsubscribe() external {
        require(subscribers[msg.sender].isActive, "Not subscribed");

        // Check if the allowance is zero before allowing unsubscription
        uint256 authorizedAmount = paymentToken.authorizedAmountFor(address(this), msg.sender);
        if (authorizedAmount != 0) {
            revert AllowanceNotZero(); // Use custom error
        }

        subscribers[msg.sender].isActive = false;
        emit Unsubscribed(msg.sender);
    }

    /**
     * @notice Checks if a user is subscribed.
     */
    function isSubscribed(address user) external view returns (bool) {
        return subscribers[user].isActive && subscribers[user].expiry > block.timestamp;
    }

    /**
     * @notice Charges only selected subscribers (chosen by off-chain logic).
     * @param users The list of users to charge.
     */
    function chargeSubscribers(address[] memory users) external {
        for (uint256 i = 0; i < users.length; i++) {
            address user = users[i];
            Subscriber storage subscriber = subscribers[user];

            if (subscriber.expiry <= block.timestamp) {
                _removeSubscriber(user);
                emit Unsubscribed(user);
            } else {
                bool success = _chargeUser(user, subscriber.tierId);
                if (!success) {
                    _removeSubscriber(user);
                    emit Unsubscribed(user);
                }
            }
        }
    }

    /// @notice Transfers payment tokens from subscriber to recipient & protocol
    /// @param user Address of the subscriber
    /// @param tierId ID of the subscription tier
    /// @return success Whether the payment was successful
    function _chargeUser(address user, uint256 tierId) internal returns (bool) {
        Subscriber storage subscriber = subscribers[user];
        if (subscriber.isActive && subscriber.expiry > block.timestamp) {
            revert AlreadySubscribed();
        }

        SubscriptionTier storage tier = tiers[tierId];
        
        uint256 price = tier.price;
        uint256 fee = (price * 2) / 100; // 2% protocol fee
        uint256 amountToCreator = price - fee;

        address[] memory from = new address[](2);
        from[0] = user;
        from[1] = user;

        address[] memory to = new address[](2);
        to[0] = recipient;
        to[1] = protocolAddress;

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = amountToCreator;
        amounts[1] = fee;

        bool[] memory force = new bool[](2);
        force[0] = true;
        force[1] = true;

        bytes[] memory data = new bytes[](2);
        data[0] = "";
        data[1] = "";

        try paymentToken.transferBatch(from, to, amounts, force, data) {
            emit PaymentSent(user, amountToCreator, fee);
            return true;
        } catch {
            revert PaymentToCreatorFailed();
        }
    }

    /// @notice Removes an inactive subscriber
    /// @param user Address of the subscriber to remove
    function _removeSubscriber(address user) internal {
        subscribers[user].isActive = false;
    }
}