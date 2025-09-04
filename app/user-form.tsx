import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export default function UserFormScreen() {
  const params = useLocalSearchParams();
  const isEditing = params.isEditing === 'true';
  const userId = params.id as string;

  const [name, setName] = useState(params.name as string || '');
  const [email, setEmail] = useState(params.email as string || '');
  const [avatarUrl, setAvatarUrl] = useState(params.avatarUrl as string || '');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const avatarEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵'];
  
  const publicAvatars = [
    'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png',
    'https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1868314_960_720.jpg',
    'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg',
    'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg',
    'https://cdn.pixabay.com/photo/2015/07/20/12/57/ambassador-852766_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/11/29/20/22/girl-1871104_960_720.jpg',
    'https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_960_720.jpg'
  ];

  const selectAvatar = (avatar: string) => {
    setAvatarUrl(avatar);
  };

  const validateFields = () => {
    if (!name.trim()) {
      showAlert('Ops!', 'Todos os campos devem ser preenchidos!');
      return false;
    }
    if (!email.trim()) {
      showAlert('Ops!', 'Todos os campos devem ser preenchidos!');
      return false;
    }
    return true;
  };

  const showAlert = (title: string, message: string) => {
    setIsModalVisible(true);
  };

  const saveUser = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const existingUsers = await AsyncStorage.getItem('users');
      const users: User[] = existingUsers ? JSON.parse(existingUsers) : [];
      
      if (isEditing) {
        // Editando usuário existente
        const updatedUsers = users.map(user => 
          user.id === userId 
            ? {
                ...user,
                name: name.trim(),
                email: email.trim(),
                avatarUrl: avatarUrl.trim() || '🐶',
              }
            : user
        );
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      } else {
        // Criando novo usuário
        const newUser: User = {
          id: Date.now().toString(),
          name: name.trim(),
          email: email.trim(),
          avatarUrl: avatarUrl.trim() || '🐶',
        };
        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));
      }
      
      // Limpar formulário
      setName('');
      setEmail('');
      setAvatarUrl('');
      
      // Voltar para a lista
      router.back();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      showAlert('Erro', 'Não foi possível salvar o usuário');
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#ed145b" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Editar Usuário' : 'Formulário de Usuários'}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe o Nome"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe o E-mail"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Avatar - Emojis</Text>
          <View style={styles.avatarContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarScroll}>
              {avatarEmojis.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={[
                    styles.avatarOption,
                    avatarUrl === emoji && styles.avatarOptionSelected
                  ]}
                  onPress={() => selectAvatar(emoji)}
                >
                  <Text style={styles.avatarEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Avatar - Imagens Públicas</Text>
          <View style={styles.avatarContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarScroll}>
              {publicAvatars.map((imageUrl, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.imageAvatarOption,
                    avatarUrl === imageUrl && styles.avatarOptionSelected
                  ]}
                  onPress={() => selectAvatar(imageUrl)}
                >
                  <Image 
                    source={{ uri: imageUrl }} 
                    style={styles.avatarPreview}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>URL do Avatar (Opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="ou informe uma URL de imagem"
            value={avatarUrl.startsWith('http') ? avatarUrl : ''}
            onChangeText={setAvatarUrl}
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveUser}>
          <Text style={styles.saveButtonText}>
            {isEditing ? 'Atualizar' : 'Salvar'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Alerta */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ops!</Text>
            <Text style={styles.modalMessage}>Todos os campos devem ser preenchidos!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ed145b',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#ed145b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#ed145b',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  avatarScroll: {
    flexGrow: 0,
  },
  avatarOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarOptionSelected: {
    borderColor: '#ed145b',
    backgroundColor: '#ffe6f0',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  imageAvatarOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  avatarPreview: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
