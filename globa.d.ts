declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GOOGLE_CLIENT_ID: string,
            GOOGLE_CLIENT_SECRET: string,
            DRIVE_API_KEY: string,
            NEXTAUTH_SECRET: string
        }
    }
}
export {};