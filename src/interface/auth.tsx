
import  {
  User ,
  Session as NextAuthSession,

} from "next-auth";
import { JWT } from "next-auth/jwt";
export interface AuthFormProps {
  isSignUp: boolean
}


export interface ExtendedJWT extends JWT {
  backendUserId?: string;
  provider?: string;
  role?: string;
  backendToken?: string;
}



export interface ExtendedSession extends NextAuthSession {
  user: User & {
    id?: string;
    role?: string;
  };
  provider?: string;
}