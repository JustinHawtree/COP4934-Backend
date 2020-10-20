/*
      account_uuid UUID DEFAULT uuid_generate_v4(),
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      accepted BOOLEAN NOT NULL DEFAULT FALSE,
      rank_uuid uuid NOT NULL DEFAULT '05b8945b-4480-47cf-a3b0-926217abadac',
      pilot_status VARCHAR(5) DEFAULT 'N/A',
      role VARCHAR(20) NOT NULL DEFAULT 'User',
      created_on TIMESTAMP,
      last_login TIMESTAMP,
      user_status VARCHAR(30) NOT NULL DEFAULT 'Available',
  */

export interface User {
  account_uuid: string;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  accepted: boolean;
  rank_uuid: string;
  pilot_status: string;
  role: string;
  user_status: string; 
  created_on?: string;
  last_login?: string;
}