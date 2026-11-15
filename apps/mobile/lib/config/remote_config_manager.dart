import 'package:flutter/foundation.dart';
import '../core/supabase_client.dart';

class RemoteConfigManager extends ChangeNotifier {
  static final RemoteConfigManager _instance = RemoteConfigManager._internal();
  factory RemoteConfigManager() => _instance;
  RemoteConfigManager._internal();

  bool _maintenanceMode = false;
  String _maintenanceMessage = 'System is undergoing scheduled maintenance.';
  String _appName = 'Northern Star Smart Campus';
  String _welcomeTitle = 'Welcome to Northern Star School & College';
  String _welcomeSubtitle = 'Building a Smart Campus for a Brighter Future';

  Map<String, bool> _moduleVisibility = {
    'attendance': true,
    'homework': true,
    'results': true,
    'fees': true,
    'library': true,
    'transport': true,
    'digital_id': true,
    'routine': true,
    'communication': true,
    'events': true,
  };

  bool get maintenanceMode => _maintenanceMode;
  String get maintenanceMessage => _maintenanceMessage;
  String get appName => _appName;
  String get welcomeTitle => _welcomeTitle;
  String get welcomeSubtitle => _welcomeSubtitle;

  bool isModuleEnabled(String moduleKey) {
    return _moduleVisibility[moduleKey] ?? true;
  }

  Future<void> fetchRemoteConfig() async {
    final client = SupabaseService.client;
    if (client != null) {
      try {
        // Fetch app config
        final configRes = await client.from('app_configurations').select().limit(1).maybeSingle();
        if (configRes != null) {
          _maintenanceMode = configRes['maintenance_mode'] ?? false;
          _maintenanceMessage = configRes['maintenance_message'] ?? _maintenanceMessage;
          _appName = configRes['app_name'] ?? _appName;
          _welcomeTitle = configRes['welcome_banner_title'] ?? _welcomeTitle;
          _welcomeSubtitle = configRes['welcome_banner_subtitle'] ?? _welcomeSubtitle;
        }

        // Fetch modules
        final List<dynamic> modulesRes = await client.from('app_modules').select();
        for (var item in modulesRes) {
          final key = item['module_key'];
          final enabled = item['is_enabled'] ?? true;
          if (key != null) {
            _moduleVisibility[key] = enabled;
          }
        }
        notifyListeners();
      } catch (e) {
        print('[RemoteConfig] Error fetching remote configuration: $e');
      }
    }
  }

  void updateModuleStatusLocally(String key, bool isEnabled) {
    _moduleVisibility[key] = isEnabled;
    notifyListeners();
  }

  void setMaintenanceModeLocally(bool enabled, [String? message]) {
    _maintenanceMode = enabled;
    if (message != null) _maintenanceMessage = message;
    notifyListeners();
  }
}
