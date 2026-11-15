import 'package:supabase_flutter/supabase_flutter.dart';
import 'constants/app_constants.dart';

class SupabaseService {
  static bool _isInitialized = false;

  static bool get isInitialized => _isInitialized;

  static SupabaseClient? get client {
    if (_isInitialized) {
      return Supabase.instance.client;
    }
    return null;
  }

  static Future<void> initialize({String? url, String? anonKey}) async {
    final supabaseUrl = url ?? AppConstants.defaultSupabaseUrl;
    final supabaseKey = anonKey ?? AppConstants.defaultSupabaseAnonKey;

    if (supabaseUrl.contains('your-project-ref') || supabaseKey.contains('your-anon-key')) {
      print('[Supabase] Running in local offline/demonstration fallback mode.');
      _isInitialized = false;
      return;
    }

    try {
      await Supabase.initialize(
        url: supabaseUrl,
        anonKey: supabaseKey,
      );
      _isInitialized = true;
      print('[Supabase] Initialized successfully.');
    } catch (e) {
      print('[Supabase] Initialization error: $e. Falling back to offline cache.');
      _isInitialized = false;
    }
  }
}
