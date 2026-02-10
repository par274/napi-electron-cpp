import type { SayHelloResponse } from '../types';
import { nativeAddon } from '../addon';

export async function handleSayHello(): Promise<SayHelloResponse> {
    try {
        const result = nativeAddon.sayHello();
        return { success: true, result };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}