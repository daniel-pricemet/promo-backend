export class Session {
  id: number;
  user_id: string;
  device_id: string;
  token: string;
  refresh_token: string;
  created_at: Date;
  refreshed_at: Date;
  expires_at: Date;
}
