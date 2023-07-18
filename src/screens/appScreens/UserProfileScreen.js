import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, TextInput, Pressable, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = ({ route }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { handleSignout } = route.params;
    const navigation = useNavigation();

    const handleSubmit = ()=>{
        console.log({email, password, firstName, lastName});
        setIsEditing(false);
    }
    return (
        <>
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <ImageBackground source={require('../../../assets/pngs/BackgroundObjects.png')} resizeMode="cover" style={styles.image}>
                    <View style={[styles.headerContainer]}>
                        <Pressable onPress={() => navigation.navigate("HomeTabs")}>
                            <Image source={require('../../../assets/pngs/BackIcon.png')}></Image>
                        </Pressable>
                        <Text style={[styles.appTextHeader]}>ScanLingo</Text>

                        <Pressable onPress={() => setIsEditing(!isEditing)}>
                            <Image source={require('../../../assets/pngs/EditIcon.png')}></Image>
                        </Pressable>

                    </View>
                    <View style={styles.spacer}></View>
                    <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                        <View style={{ flex: 1, marginRight: 10, width: '100%' }}>
                            <Text style={styles.textLabel}> First Name </Text>
                            <TextInput
                                editable={isEditing}
                                placeholder="First Name"
                                style={[styles.input, !isEditing && {backgroundColor: '#DBDBDB', borderColor: 'gray'} ]}
                                value={firstName}
                                onChangeText={text => setFirstName(text)}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textLabel}> Last Name </Text>
                            <TextInput
                                editable={isEditing}
                                placeholder="Last Name"
                                style={[styles.input,!isEditing && {backgroundColor: '#DBDBDB', borderColor: 'gray'}]}
                                value={lastName}
                                onChangeText={text => setLastName(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>

                        <View style={styles.inputFieldContainer}>

                            <Text style={styles.textLabel}> Email Address</Text>
                            <TextInput
                                editable={isEditing}
                                placeholder="Email"
                                style={[styles.input, !isEditing && {backgroundColor: '#DBDBDB', borderColor: 'gray'}]}
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />

                        </View>
                        <View>
                            <Text style={styles.textLabel}> Password </Text>
                            <TextInput
                                editable={isEditing}
                                placeholder="Password"
                                style={[styles.input,!isEditing && {backgroundColor: '#DBDBDB', borderColor: 'gray'}]}
                                value={password}
                                onChangeText={text => setPassword(text)}
                                secureTextEntry
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        {isEditing && (<TouchableOpacity style={styles.button} onPress={handleSignout}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>)}
                        <TouchableOpacity style={styles.button} onPress={handleSignout}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>

        </>
    )
}

export default UserProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingLeft: 10,
        paddingRight: 10
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
    },
    textSubtitle: {
        color: '#96A3AB',
        fontSize: 18,
        paddingTop: 10
    },
    spacer: {
        marginTop: 50,
        marginBottom: 50
    },
    textHeader: {
        fontFamily: 'doppio-one',
        fontSize: 28
    },
    appTextHeader: {
        fontFamily: 'doppio-one',
        fontSize: 24,
        textAlign: 'center',
        color: '#056174'
    },
    textLabel: {
        fontFamily: 'doppio-one',
        marginBottom: 5
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        // 
    },
    inputFieldContainer: {
        marginVertical: 10
    },
    flexHorizontalContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    horizontalWidth: {
        width: '50%',

    },
    horizontalLeft: {
        marginRight: 10,
    },
    buttonContainer: {
        width: '60%',
        marginVertical: 20,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#07C9C5',
        padding: 15,
        width: '100%',
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 700
    },
    containerLine: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#96A3AB',
    },
    textLine: {
        width: 100,
        textAlign: 'center',
        color: '#96A3AB'
    },
})