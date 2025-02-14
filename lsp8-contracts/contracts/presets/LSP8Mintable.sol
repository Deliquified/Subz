// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./Subscription.sol";

contract SubscriptionFactory {
    // Event emitted when a new subscription contract is created
    event SubscriptionCreated(
        address indexed contractAddress, 
        address indexed owner,
        string name
    );

    // Mapping from Universal Profile to their deployed subscription contracts
    mapping(address => address[]) public creatorSubscriptions;
    
    // Mapping to check if an address is a subscription contract created by this factory
    mapping(address => bool) public isSubscriptionContract;
    
    // Mapping from subscription contract to its creator
    mapping(address => address) public subscriptionCreator;

    function createSubscription(
        string memory name,
        address recipient,
        address paymentToken
    ) external returns (address) {
        Subscription newContract = new Subscription(
            msg.sender,  // owner
            name,
            recipient,
            address(this), // protocol fee collector
            paymentToken
        );
        
        address subscriptionAddress = address(newContract);
        
        // Record the deployment
        creatorSubscriptions[msg.sender].push(subscriptionAddress);
        isSubscriptionContract[subscriptionAddress] = true;
        subscriptionCreator[subscriptionAddress] = msg.sender;
        
        emit SubscriptionCreated(subscriptionAddress, msg.sender, name);
        return subscriptionAddress;
    }

    /**
     * @notice Get all subscription contracts created by a specific Universal Profile
     * @param creator The address of the Universal Profile
     */
    function getCreatorSubscriptions(address creator) 
        external 
        view 
        returns (address[] memory) 
    {
        return creatorSubscriptions[creator];
    }

    /**
     * @notice Verify if a subscription contract belongs to a specific creator
     * @param subscriptionAddress The address of the subscription contract
     * @param creator The address of the potential creator
     */
    function isCreatorOfSubscription(
        address subscriptionAddress, 
        address creator
    ) 
        external 
        view 
        returns (bool) 
    {
        return subscriptionCreator[subscriptionAddress] == creator;
    }

    // Function to withdraw collected protocol fees
    function withdrawProtocolFees() external {
        // Add access control as needed
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}