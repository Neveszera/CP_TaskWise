import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MemberScreen = () => {
    const members = [
        {
            name: 'Gabriel Neves Gomes',
            photo: require('../assets/members/NevesPerfil.png'),
            email: 'gabrielgng26@gmail.com',
            github: 'https://github.com/Neveszera',
            linkedin: 'https://www.linkedin.com/in/-gabriel-neves/',
            description: '..',
        },
        {
            name: 'Gabriel Sampaio Gianini',
            photo: require('../assets/members/SampaioPerfil.png'),
            email: 'gianinisampaio1@gmail.com',
            github: 'https://github.com/gabrielsampaiog',
            linkedin: 'https://www.linkedin.com/in/gabrielsampaiogianini/',
            description: 'Gerenciador de bancos e dev',
        },
    ];

    const openLink = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            {members.map((member, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() => console.log("Card pressed", member.name)}
                >
                    <Image source={member.photo} style={styles.photo} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{member.name}</Text>
                        <Text style={styles.email}>{member.email}</Text>
                        <Text style={styles.description}>{member.description}</Text>
                        <View style={styles.linksContainer}>
                            <TouchableOpacity onPress={() => openLink(member.github)}>
                                <FontAwesome name="github" size={24} color="#333333" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openLink(member.linkedin)}>
                                <FontAwesome name="linkedin" size={24} color="#0077b5" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        marginBottom: 5,
        color: '#666666',
    },
    description: {
        marginBottom: 10,
    },
    linksContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 10,
    },
});

export default MemberScreen;
