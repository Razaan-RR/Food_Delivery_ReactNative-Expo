import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from "@/constants";

const CartButton = () => {
    const totalItems = 10;

    return (
        <TouchableOpacity 
            className="cart-btn" 
            onPress={() => {}}
            style={{ backgroundColor: '#F0FDF4' }} 
        >
            <Image 
                source={images.bag} 
                className="size-5" 
                resizeMode="contain" 
                style={{ tintColor: '#16A34A' }} 
            />

            {totalItems > 0 && (
                <View 
                    className="cart-badge" 
                    style={{ backgroundColor: '#16A34A' }} 
                >
                    <Text className="small-bold text-white">
                        {totalItems}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default CartButton