import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BellIcon } from 'react-native-heroicons/outline'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from '../../../constants/colors';

const Header = () => {
  return (
    <View style={styles.conatiner}>
       <View style={styles.infoConatiner}>
            <Image source={{uri : 'https://xsgames.co/randomusers/avatar.php?g=male'}} style={styles.image} />
            <View style={styles.textConatiner}>
                 <Text style={styles.wlcTxt}>Welcome</Text>
                 <Text style={styles.nameTxt}>Balaji!</Text>
            </View>
       </View>
       <TouchableOpacity>
         <BellIcon size={hp(3)} color={colors.black}/>
        </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    conatiner:{
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image:{
       width: wp(12),
       height: hp(5),
       borderRadius: 20
    },
    infoConatiner:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    textConatiner:{
        flexDirection: 'column',
        gap: 3
    },
    wlcTxt:{
        fontSize: hp(1.6),
        color: colors.darkGrey,
        letterSpacing: 0.5
    },
    nameTxt:{
        fontSize: hp(1.8),
        fontWeight: '700',
        color: colors.black,
        letterSpacing: 0.8
    }
})