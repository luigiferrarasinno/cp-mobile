import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export default function UserListScreen() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    initializeExampleData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [])
  );

  const initializeExampleData = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      if (!storedUsers) {
        const exampleUsers: User[] = [
          {
            id: '1',
            name: 'Rosana Albuquerque',
            email: 'rosana@email.com',
            avatarUrl: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png'
          },
          {
            id: '2',
            name: 'Ranata',
            email: 'renata@email.com',
            avatarUrl: '🐱'
          },
          {
            id: '3',
            name: 'Thomaz',
            email: 'riana@email.com',
            avatarUrl: 'https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1868314_960_720.jpg'
          }
        ];
        await AsyncStorage.setItem('users', JSON.stringify(exampleUsers));
        setUsers(exampleUsers);
      }
    } catch (error) {
      console.error('Erro ao inicializar dados de exemplo:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  const navigateToForm = (user?: User) => {
    if (user) {
      router.push({
        pathname: '../user-form',
        params: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
          isEditing: 'true'
        }
      });
    } else {
      router.push('../user-form');
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const updatedUsers = users.filter(user => user.id !== userId);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const confirmDelete = (user: User) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir ${user.name}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deleteUser(user.id),
        },
      ]
    );
  };

  const getAvatarSource = (avatarUrl: string) => {
    if (avatarUrl && avatarUrl.startsWith('http')) {
      return { uri: avatarUrl };
    }
    // Se for um caminho local ou vazio, usar avatar padrão
    return require('@/assets/images/adaptive-icon.png');
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <View style={styles.userContent}>
        {item.avatarUrl && !item.avatarUrl.startsWith('http') ? (
          <View style={styles.emojiAvatar}>
            <Text style={styles.emojiText}>{item.avatarUrl}</Text>
          </View>
        ) : (
          <Image 
            source={getAvatarSource(item.avatarUrl)} 
            style={styles.avatar}
            defaultSource={require('@/assets/images/adaptive-icon.png')}
          />
        )}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => navigateToForm(item)}
        >
          <Text style={styles.editButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => confirmDelete(item)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ed145b" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de Usuários</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigateToForm()}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de usuários */}
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum usuário cadastrado</Text>
          </View>
        }
      />
    </View>
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
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    padding: 20,
  },
  userItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  emojiAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emojiText: {
    fontSize: 24,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  editButtonText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    fontSize: 16,
  },
});
