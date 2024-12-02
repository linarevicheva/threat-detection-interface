import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

export async function getSecret(secretName: string): Promise<string> {
  const [version] = await client.accessSecretVersion({ name: secretName });
  const payload = version.payload?.data?.toString();
  if (!payload) {
    throw new Error('Secret payload is empty');
  }
  return payload;
}
