 
import { View,  Dimensions, Image, StyleSheet } from 'react-native';
 
import Swiper from 'react-native-swiper';
 
import { APP_URL } from '../config';
import useDeals from '../hooks/useDeals';
import Skeleton from './home/skeleton/Skeleton';

const { width: screenWidth, height } = Dimensions.get('window');

const DealsCarousel = () => {
    const { deals, loading, errors } = useDeals();
 

    return (
        <>
            {loading ? <Skeleton height={(height / 4.75)} width="100%" style={{ borderRadius: 10, }} /> :
                <Swiper autoplay={true} showsPagination={true} style={{ height: height / 4.75 }}>
                    {deals.map((deal, index) => (
                        <View key={index} style={styles.slide}>

                            <Image source={{ uri: APP_URL + '/public/storage/' + deal.image }} style={[styles.image, {height:(height / 4.75)}]} />

                        </View>
                    ))}
                </Swiper>
            }

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
        // height: 145,
        borderRadius: 10,
    },
    title: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DealsCarousel;
