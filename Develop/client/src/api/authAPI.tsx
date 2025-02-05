import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    console.log('🔍 Sending Login Request:', userInfo);

    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(`Login failed: ${errorMessage.message}`);
    }

    const data = await response.json();
    console.log('✅ Login Success:', data);
    return data;
  } catch (err) {
    console.error('❌ Login error:', err);
    return Promise.reject('Login failed');
  }
};

export { login };
