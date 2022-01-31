export {};
declare global {
    interface Window {
        api: {
          openFile(): Promise<string|null>;
          startChatSession(): void;
          whoAmI(): Promise<string>;
          sendGlobalMessage(user: string, message: string): Promise<void>
          receiveMessage(callback: (user: string, message: string) => void): void;
      }
    }
  }