import React, { PureComponent } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import {addFriend} from '../redux/actions/friend'
import { NavigationActions } from 'react-navigation'

class AddFriend extends PureComponent {
    render() {
        let name="";
        let sex="";
        let age=""
        return (
            <View style={{  justifyContent: 'center', alignItems: 'center' }}>
                
                <TextInput 
                    style={{ width:200}}
                    placeholder="name" 
                    onChangeText={(text)=>{name=text}}/>
                <TextInput 
                    style={{ width:200}}
                    placeholder="sex" 
                    onChangeText={(text)=>{sex=text}}/>
                <TextInput 
                    style={{ width:200}}
                    placeholder="age" 
                    onChangeText={(text)=>{age=text}}/>
                <Button
                    onPress={() => {
                        var f={}
                        f.name=name
                        f.sex=sex
                        f.age=age
                        this.props.dispatch(addFriend(f))
                        this.props.navigation.dispatch(NavigationActions.back());
                    }}
                    title="add Friend"
                />
            </View>
        );
    }
}
const mapStateToProps = store => {
    return {
      friendList: store.friendState,
    }
  }
export default connect(mapStateToProps)(AddFriend);