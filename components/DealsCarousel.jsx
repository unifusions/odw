import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';
import Swiper from 'react-native-swiper';
import { getDeals } from '../services/dealservices';
import { APP_URL } from '../config';

const { width: screenWidth } = Dimensions.get('window');

const DealsCarousel = () => {
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const data = await getDeals(); // Make sure getDeals is defined
                setDeals(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDeals();
    }, []);

    return (
        <>
            <Swiper autoplay={true} showsPagination={true} style={{ height: 165 }}>
                {deals.map((deal, index) => (
                    <View key={index} style={styles.slide}>

                        <Image source={{ uri: APP_URL + '/public/storage/' + deal.image }} style={styles.image} />

                    </View>
                ))}
            </Swiper>
        </>
    );
};

const styles = StyleSheet.create({
    slide: {
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 145,
        borderRadius: 10,
    },
    title: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DealsCarousel;
