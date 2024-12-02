// app/api/login/route.ts
import { NextResponse } from 'next/server';

type User = {
  id: number;
  username: any;
  password: any;
};

const users: User[] = [
  {
    id: 1,
    username: process.env.AUTH_USERNAME,
    password: process.env.AUTH_PASSWORD,
  },
];

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return NextResponse.json({ message: 'Login successful', user }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
