import { BadRequestException, Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class TokenService {
  generateTokens<P extends object>(payload: P) {
    try {
      return {
        accessToken: this.generateAccessToken<P>(payload),
        refreshToken: this.generateRefreshToken<P>(payload)
      }
    } catch (error) {
      throw new BadRequestException('Generating tokens was failed')
    }
  }

  generateAccessToken<P extends object>(payload: P) {
    return jwt.sign(payload, 'process.env.ACCESS_SECRET_KEY', {
      expiresIn: '1d' // process.env.ACCESS_TOKEN_EXPIRES_IN
    })
  }

  generateRefreshToken<P extends object>(payload: P) {
    return jwt.sign(payload, 'process.env.REFRESH_TOKEN', {
      expiresIn: '30d' // process.env.REFRESH_TOKEN_EXPIRES_IN
    })
  }

  validateAccessToken(token: string) {
    return this.tokenValidationFactory(token, 'process.env.ACCESS_SECRET_KEY')
  }

  validateRefreshToken(token: string) {
    return this.tokenValidationFactory(token, 'process.env.REFRESH_SECRET_KEY')
  }

  private tokenValidationFactory(token: string, secretKey: string) {
    try {
      return jwt.verify(token, secretKey)
    } catch (error) {
      return null
    }
  }
}
