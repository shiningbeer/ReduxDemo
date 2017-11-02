import React, { PureComponent } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Button,
} from 'react-native';
import { connect } from 'react-redux';
import {delFriend} from '../redux/actions/friend'
class FriendList extends PureComponent {

    _renderItem = (item) => {
        console.log(item)
        return <View style={{flexDirection:'row'}}>
                <Text>{item.item.item.name}</Text>
                <Text>--</Text>
                <Text>{item.item.item.sex}</Text>
                <Text>--</Text>
                <Text>{item.item.item.age}</Text>
                <Text>--</Text>
                <Text
                    onPress={() => {
                        this.props.dispatch(delFriend(item.item.item.name))
                    }}
                >click me to delete</Text>
        </View>
    }
    render() {
        let _renderWithData = (data) => {
            if (data.length == 0)
                return <Text style={{ paddingLeft: 30, paddingTop: 30, color: 'grey' }}>no friend</Text>
            else {
                return (
                    <FlatList
                        renderItem={this._renderItem}
                        data={data}>
                    </FlatList>
                )
            }

        }
        
        let data_friendlist=[];
        console.log(this.props.friendList.friend_list)
        for (i=0;i<this.props.friendList.friend_list.length;i++){
            var a={}
            a.key=i;
            a.item=this.props.friendList.friend_list[i];
            data_friendlist.push(a);
        }
        


        return (
            <View style={{justifyContent: 'center', alignItems: 'center' }}>
                {_renderWithData(data_friendlist)}
                <Button
                    onPress={() => this.props.navigation.navigate('AddFriend')}
                    title="Add Friend"
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
export default connect(mapStateToProps)(FriendList);