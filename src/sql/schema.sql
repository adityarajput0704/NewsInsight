-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  trust_points INTEGER DEFAULT 0,
  verifications_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  avatar_url TEXT
);

-- Create news items table
CREATE TABLE news_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  trust_score REAL DEFAULT 0.0,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  url TEXT,
  image_url TEXT
);

-- Create trust metrics table
CREATE TABLE trust_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  score REAL NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT DEFAULT 'general'
);

-- Create rumors table
CREATE TABLE rumors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content TEXT NOT NULL,
  source TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'verified', 'debunked')) DEFAULT 'pending',
  trust_score REAL DEFAULT 0.0,
  votes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  submitted_by UUID REFERENCES auth.users(id)
);

-- Create verifications table
CREATE TABLE verifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  news_item_id UUID REFERENCES news_items(id),
  user_id UUID REFERENCES auth.users(id),
  is_verified BOOLEAN NOT NULL,
  confidence_score REAL DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user activities table
CREATE TABLE user_activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  activity_type TEXT NOT NULL,
  activity_data JSONB,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for development
INSERT INTO user_profiles (id, email, username, trust_points, verifications_count) VALUES
  ('00000000-0000-0000-0000-000000000001', 'demo@newsinsight.com', 'Demo User', 2500, 45),
  ('00000000-0000-0000-0000-000000000002', 'alice@example.com', 'Alice Johnson', 1890, 32),
  ('00000000-0000-0000-0000-000000000003', 'bob@example.com', 'Bob Smith', 1650, 28),
  ('00000000-0000-0000-0000-000000000004', 'carol@example.com', 'Carol Davis', 1420, 24),
  ('00000000-0000-0000-0000-000000000005', 'david@example.com', 'David Wilson', 1200, 20);

INSERT INTO news_items (title, content, source, verified, trust_score, category) VALUES
  ('Breaking: New Climate Research Shows Promising Results', 'Scientists at leading universities have published groundbreaking research on climate change mitigation strategies...', 'Nature Climate Journal', true, 94.5, 'Science'),
  ('Tech Giants Announce Joint AI Safety Initiative', 'Major technology companies have formed an alliance to develop safer artificial intelligence systems...', 'Tech News Daily', true, 89.2, 'Technology'),
  ('Global Economic Summit Addresses Inflation Concerns', 'World leaders gathered to discuss coordinated responses to rising inflation rates across major economies...', 'Economic Times', true, 91.8, 'Economics'),
  ('Unverified: Celebrity Scandal Rocks Social Media', 'Unconfirmed reports about a major celebrity have been circulating on social media platforms...', 'Social Media', false, 23.1, 'Entertainment'),
  ('Health Breakthrough: New Treatment Shows Promise', 'Clinical trials for a revolutionary treatment approach have shown remarkable success rates...', 'Medical Journal', true, 87.6, 'Health');

INSERT INTO trust_metrics (metric_name, score, category) VALUES
  ('Source Reliability', 96.0, 'reliability'),
  ('Fact Verification', 92.0, 'verification'),
  ('Content Accuracy', 95.0, 'accuracy'),
  ('Detection Rate', 94.0, 'detection'),
  ('Source Reliability', 94.5, 'reliability'),
  ('Fact Verification', 90.8, 'verification'),
  ('Content Accuracy', 93.2, 'accuracy'),
  ('Detection Rate', 92.7, 'detection');

INSERT INTO rumors (content, source, status, trust_score, votes_count) VALUES
  ('Major tech company planning massive layoffs next quarter', 'Anonymous insider', 'pending', 45.2, 156),
  ('New vaccine side effects discovered in recent study', 'Unverified medical source', 'debunked', 15.8, 89),
  ('Celebrity couple secretly married in private ceremony', 'Entertainment blog', 'verified', 78.9, 234),
  ('Government planning new environmental regulations', 'Policy insider', 'pending', 67.3, 198);

-- Set up Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all profiles" ON user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view news items" ON news_items FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert news items" ON news_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can view all verifications" ON verifications FOR SELECT USING (true);
CREATE POLICY "Users can insert own verifications" ON verifications FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own activities" ON user_activities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activities" ON user_activities FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_news_items_created_at ON news_items(created_at DESC);
CREATE INDEX idx_news_items_verified ON news_items(verified);
CREATE INDEX idx_news_items_category ON news_items(category);
CREATE INDEX idx_trust_metrics_timestamp ON trust_metrics(timestamp DESC);
CREATE INDEX idx_user_profiles_trust_points ON user_profiles(trust_points DESC);
CREATE INDEX idx_verifications_user_id ON verifications(user_id);
CREATE INDEX idx_verifications_news_item_id ON verifications(news_item_id);

-- Create function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, username)
  VALUES (NEW.id, NEW.email, SPLIT_PART(NEW.email, '@', 1));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();