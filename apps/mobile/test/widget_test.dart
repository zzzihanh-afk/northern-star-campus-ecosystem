import 'package:flutter_test/flutter_test.dart';
import 'package:northern_star_smart_campus/main.dart';
import 'package:northern_star_smart_campus/config/remote_config_manager.dart';

void main() {
  group('Northern Star Smart Campus Mobile Tests', () {
    test('RemoteConfigManager updates module status and maintenance mode dynamically', () {
      final config = RemoteConfigManager();

      expect(config.isModuleEnabled('attendance'), isTrue);

      config.updateModuleStatusLocally('attendance', false);
      expect(config.isModuleEnabled('attendance'), isFalse);

      config.updateModuleStatusLocally('attendance', true);
      expect(config.isModuleEnabled('attendance'), isTrue);

      expect(config.maintenanceMode, isFalse);
      config.setMaintenanceModeLocally(true, 'Test maintenance');
      expect(config.maintenanceMode, isTrue);
      expect(config.maintenanceMessage, equals('Test maintenance'));

      config.setMaintenanceModeLocally(false);
      expect(config.maintenanceMode, isFalse);
    });

    testWidgets('App renders login portal switcher by default', (WidgetTester tester) async {
      await tester.pumpWidget(const NorthernStarCampusApp());
      await tester.pumpAndSettle();

      expect(find.text('NORTHERN STAR'), findsOneWidget);
      expect(find.text('SCHOOL & COLLEGE'), findsOneWidget);
      expect(find.text('Select Campus Portal'), findsOneWidget);
      expect(find.text('Access Portal'), findsOneWidget);
    });
  });
}
