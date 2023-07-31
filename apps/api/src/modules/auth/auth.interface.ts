export interface InvitationTokenPayload {
  role: string
  email: string
}

export interface ConfirmationCodePayload {
  confirmationCode: string
  email: string
}
