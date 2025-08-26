import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {useAuth} from '../../untils/login';
import {getSafeCode} from '../../api/login';

export default function RegisterScreen({navigation}: {navigation: any}) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [uuid, setUuid] = useState('');
  const [codeUrl, setCodeUrl] = useState('');
  const [CAPTCHA, setCAPTCHA] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const {login} = useAuth();

  useEffect(() => {
    setIsGenerating(false);
    getSafeCode()
      .then((data: any) => {
        setCodeUrl('data:image/gif;base64,' + data.img);
        setUuid(data.uuid);
      })
      .catch(error => {
        throw error;
      });
  }, []);

  const handleRegister = async () => {
    try {
      if (!password.trim()) {
        setErrorMessage('请输入密码');
        return;
      }
      if (!account.trim()) {
        setErrorMessage('请输入账户');
        return;
      }
      if (!CAPTCHA.trim()) {
        setErrorMessage('请输入验证码');
        return;
      }
      setErrorMessage('');
      const loginInfo = {
        username: account,
        password: password,
        code: CAPTCHA,
        uuid: uuid,
      };
      await login(loginInfo);
    } catch (error: any) {
      getSafeCode()
        .then((data: any) => {
          setCodeUrl('data:image/gif;base64,' + data.img);
          setUuid(data.uuid);
        })
        .catch(error => {
          throw error;
        });
      setErrorMessage(error.message || '登陆失败');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>用户登陆</Text>
      {isGenerating ? (
        <Text style={styles.loadingText}>正在完善服务请稍候...</Text>
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>账户</Text>
            <TextInput
              style={styles.input}
              value={account}
              onChangeText={setAccount}
              placeholder="请输入账户"
            />
            <Text style={styles.sectionTitle}>密码</Text>
            <TextInput
              style={styles.input}
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              placeholder="请输入密码"
            />
            <Text style={styles.sectionTitle}>验证码</Text>
            <Image
              style={styles.captcha}
              source={{uri: codeUrl}}
              alt="验证码"
            />
            <TextInput
              style={styles.input}
              value={CAPTCHA}
              onChangeText={setCAPTCHA}
              placeholder="请输入验证码"
            />

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            <Button title="登陆" onPress={handleRegister} color="#2ecc71" />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  captcha: {
    width: 100,
    height: 40,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3498db',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  cipherContainer: {
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  cipherText: {
    fontFamily: 'Courier New',
    fontSize: 12,
    lineHeight: 18,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#f8f9fa',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 15,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7f8c8d',
    marginVertical: 30,
  },
  instructions: {
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  instructionsTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1976d2',
  },
  instruction: {
    marginBottom: 5,
    color: '#455a64',
  },
});
