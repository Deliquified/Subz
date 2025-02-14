// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.12;

// interfaces
import {ILSP8Mintable} from "./ILSP8Mintable.sol";

// modules
import {
    LSP8IdentifiableDigitalAsset
} from "../LSP8IdentifiableDigitalAsset.sol";

// Subscriptions
import { Subscription } from './Subscription.sol';

/**
 * @title LSP8IdentifiableDigitalAsset deployable preset contract with a public {mint} function callable only by the contract {owner}.
 */
contract LSP8Mintable is LSP8IdentifiableDigitalAsset, ILSP8Mintable {
    /**
     * @notice Deploying a `LSP8Mintable` token contract with: token name = `name_`, token symbol = `symbol_`, and
     * address `newOwner_` as the token contract owner.
     *
     * @param name_ The name of the token.
     * @param symbol_ The symbol of the token.
     * @param newOwner_ The owner of the token contract.
     * @param lsp4TokenType_ The type of token this digital asset contract represents (`0` = Token, `1` = NFT, `2` = Collection).
     * @param lsp8TokenIdFormat_ The format of tokenIds (= NFTs) that this contract will create.
     */
    constructor(
        string memory name_,
        string memory symbol_,
        address newOwner_,
        uint256 lsp4TokenType_,
        uint256 lsp8TokenIdFormat_
    )
        LSP8IdentifiableDigitalAsset(
            name_,
            symbol_,
            newOwner_,
            lsp4TokenType_,
            lsp8TokenIdFormat_
        )
    {}

    // Maps tokenID to deployed contract address
    mapping(bytes32 => address) public deployedContracts; 

    // Event emitted when a new subscription contract is created
    event SubscriptionCreated(address indexed contractAddress, bytes32 tokenId);

    /**
     * @notice This function satisfies ILSP8Mintable but is blocked to prevent direct minting.
     */
    function mint(
        address,
        bytes32,
        bool,
        bytes memory
    ) public pure override {
        revert("Direct minting is not allowed. Use mintSubscription()");
    }

    /**
     * @notice Internal mint function, only callable from within the contract.
     */
    function _mintInternal(
        address to,
        bytes32 tokenId,
        bool force,
        bytes memory data
    ) internal {
        _mint(to, tokenId, force, data);
    }

    /**
     * @notice Public function to mint and deploy a subscription contract.
     * @param to The address that will receive the minted `tokenId`.
     * @param name The name of the subscription.
     * @param recipient The address that receives the subscription payments.
     */
    function mintSubscription(
        address to,
        string memory name,
        address recipient,
        address stablecoin
    ) public {
        // Deploy the subscription contract, using `address(this)` as the protocol address
        Subscription newContract = new Subscription(
            to,
            name,
            recipient,
            address(this), // Contract collects protocol fees
            stablecoin
        );

        // Use the contract address as the tokenId
        bytes32 tokenId = bytes32(uint256(uint160(address(newContract))));

        deployedContracts[tokenId] = address(newContract);

        // Mint the LSP8 token representing the subscription contract
        _mintInternal(to, tokenId, true, "");

        emit SubscriptionCreated(address(newContract), tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        bytes32 tokenId,
        bool force,
        bytes memory data
    ) internal virtual override {
        require(from == address(0) || to == address(0), "Transfers are not allowed");
    }

    /**
     * @notice Allows the contract owner to withdraw collected protocol fees.
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdraw failed");
    }
}
