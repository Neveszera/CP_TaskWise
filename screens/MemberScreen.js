import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MemberScreen = () => {
    const members = [
        {
            name: 'Gabriel Neves Gomes',
            photo: require('../assets/NevesPerfil.png'),
            email: 'gabrielgng26@gmail.com',
            github: 'https://github.com/Neveszera',
            linkedin: 'https://www.linkedin.com/in/-gabriel-neves/',
            description: '..',
        },
        {
            name: 'Gabriel Sampaio Gianini',
            photo: require('../assets/SampaioPerfil.png'),
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
                <View key={index}>
                    <View style={styles.memberContainer}>
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
                    </View>
                    {index < members.length - 1 && <View style={styles.separator} />}
                </View>
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
    memberContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'flex-start',
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
        marginBottom: 5,
    },
    icon: {
        marginRight: 10,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        marginBottom: 20,
    },
});

export default MemberScreen;
