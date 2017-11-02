import React, { PureComponent } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,

} from 'react-native';
import { StackNavigator } from 'react-navigation';
import FriendList from './pages/FriendList';
import AddFriend from './pages/AddFriend';


export default class RootScene extends PureComponent {

    constructor() {
        super()
    }
    render() {
        return (

            <FriendNavigator />
        );
    }
}

const FriendNavigator = StackNavigator({
    FriendList: { screen: FriendList },
    AddFriend: { screen: AddFriend }
})