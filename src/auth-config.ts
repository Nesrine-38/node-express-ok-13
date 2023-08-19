import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    return done(null, payload);
}))