import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(readonly configService: ConfigService) {
    // Neste caso, não definimos a instância da classe como privada, pois ela precisa ser acessada pela sua classe pai (super).

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    
    return { userId: payload.sub, username: payload.username };
  }
}
