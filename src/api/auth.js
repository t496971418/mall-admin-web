/*
 * @Author: Terryzh
 * @Date: 2019-08-19 18:33:49
 * @LastEditors: Terryzh
 * @LastEditTime: 2019-08-19 18:34:02
 * @Description: auth
 */
import gql from 'graphql-tag';

export const newCaptchaGQL = gql`
  mutation newCaptcha {
    newCaptcha {
      challenge
      success
      gt
      new_captcha
    }
  }
`;

export const signinGQL = gql`
  mutation signin(
    $userName: String!
    $password: String!
    $challenge: String!
    $validate: String!
    $seccode: String!
  ) {
    signin(
      userName: $userName
      password: $password
      challenge: $challenge
      validate: $validate
      seccode: $seccode
    ) {
      token
      tokenType
      expiresIn
      refreshToken
    }
  }
`;

export const userByMeGQL = gql`
  query userByMe {
    userByMe {
      userId
      userName
      nickName
    }
  }
`;
