import 'package:flutter/material.dart';
import 'core/theme/campus_theme.dart';
import 'core/constants/app_constants.dart';
import 'core/supabase_client.dart';
import 'config/remote_config_manager.dart';
import 'models/user_profile.dart';
import 'features/auth/login_screen.dart';
import 'features/student/student_home_screen.dart';
import 'features/parent/parent_home_screen.dart';
import 'features/teacher/teacher_home_screen.dart';
import 'features/staff/staff_home_screen.dart';
import 'features/attendance/attendance_screen.dart';
import 'features/results/results_screen.dart';
import 'features/fees/fees_screen.dart';
import 'features/library/library_screen.dart';
import 'features/digital_id/digital_id_screen.dart';
import 'features/notifications/notifications_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SupabaseService.initialize();
  await RemoteConfigManager().fetchRemoteConfig();
  runApp(const NorthernStarCampusApp());
}

class NorthernStarCampusApp extends StatelessWidget {
  const NorthernStarCampusApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: AppConstants.appName,
      debugShowCheckedModeBanner: false,
      theme: CampusTheme.lightTheme,
      home: const CampusRootNavigator(),
    );
  }
}

class CampusRootNavigator extends StatefulWidget {
  const CampusRootNavigator({Key? key}) : super(key: key);

  @override
  State<CampusRootNavigator> createState() => _CampusRootNavigatorState();
}

class _CampusRootNavigatorState extends State<CampusRootNavigator> {
  UserRole? _currentRole;
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    if (_currentRole == null) {
      return LoginScreen(
        onLoginSuccess: (role) {
          setState(() {
            _currentRole = role;
          });
        },
      );
    }

    final remoteConfig = RemoteConfigManager();

    return ListenableBuilder(
      listenable: remoteConfig,
      builder: (context, _) {
        if (remoteConfig.maintenanceMode) {
          return Scaffold(
            backgroundColor: CampusTheme.navyDark,
            body: Center(
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.shield_outlined, color: CampusTheme.goldAccent, size: 64),
                    const SizedBox(height: 16),
                    const Text(
                      'Maintenance Mode',
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: Colors.white),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      remoteConfig.maintenanceMessage,
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 12, color: Color(0xFFCBD5E1)),
                    ),
                    const SizedBox(height: 24),
                    TextButton(
                      onPressed: () {
                        setState(() => _currentRole = null);
                      },
                      child: const Text('Back to Portal Switcher', style: TextStyle(color: CampusTheme.goldAccent)),
                    ),
                  ],
                ),
              ),
            ),
          );
        }

        return Scaffold(
          appBar: AppBar(
            leading: Padding(
              padding: const EdgeInsets.only(left: 12.0),
              child: Image.asset('assets/images/logo.png', width: 28, height: 28),
            ),
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  remoteConfig.appName,
                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: CampusTheme.navyDark),
                ),
                Text(
                  '${_getRoleTitle(_currentRole!)} Mode',
                  style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: CampusTheme.royalBlue),
                ),
              ],
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.notifications_none, size: 22),
                onPressed: () => _navigateTo(context, const NotificationsScreen()),
              ),
              IconButton(
                icon: const Icon(Icons.swap_horiz, size: 22),
                tooltip: 'Switch Portal',
                onPressed: () {
                  setState(() => _currentRole = null);
                },
              ),
            ],
          ),
          body: _buildCurrentPortal(_currentRole!),
          bottomNavigationBar: _buildBottomNav(_currentRole!),
        );
      },
    );
  }

  Widget _buildCurrentPortal(UserRole role) {
    switch (role) {
      case UserRole.student:
        return StudentHomeScreen(onNavigate: _handleInternalNav);
      case UserRole.parent:
        return ParentHomeScreen(onNavigate: _handleInternalNav);
      case UserRole.teacher:
        return TeacherHomeScreen(onNavigate: _handleInternalNav);
      case UserRole.staff:
      default:
        return StaffHomeScreen(onNavigate: _handleInternalNav);
    }
  }

  void _handleInternalNav(String route) {
    switch (route) {
      case 'attendance':
        _navigateTo(context, const AttendanceScreen());
        break;
      case 'results':
        _navigateTo(context, const ResultsScreen());
        break;
      case 'fees':
        _navigateTo(context, const FeesScreen());
        break;
      case 'library':
        _navigateTo(context, const LibraryScreen());
        break;
      case 'digital_id':
        _navigateTo(context, const DigitalIdScreen());
        break;
      case 'notifications':
        _navigateTo(context, const NotificationsScreen());
        break;
      default:
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Viewing $route module.')),
        );
    }
  }

  void _navigateTo(BuildContext context, Widget screen) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => screen));
  }

  Widget _buildBottomNav(UserRole role) {
    List<BottomNavigationBarItem> items;

    if (role == UserRole.parent) {
      items = const [
        BottomNavigationBarItem(icon: Icon(Icons.home_outlined), activeIcon: Icon(Icons.home), label: 'Home'),
        BottomNavigationBarItem(icon: Icon(Icons.people_outline), activeIcon: Icon(Icons.people), label: 'Children'),
        BottomNavigationBarItem(icon: Icon(Icons.chat_bubble_outline), activeIcon: Icon(Icons.chat_bubble), label: 'Messages'),
        BottomNavigationBarItem(icon: Icon(Icons.grid_view), label: 'More'),
      ];
    } else if (role == UserRole.teacher) {
      items = const [
        BottomNavigationBarItem(icon: Icon(Icons.home_outlined), activeIcon: Icon(Icons.home), label: 'Home'),
        BottomNavigationBarItem(icon: Icon(Icons.school_outlined), activeIcon: Icon(Icons.school), label: 'Classes'),
        BottomNavigationBarItem(icon: Icon(Icons.chat_bubble_outline), activeIcon: Icon(Icons.chat_bubble), label: 'Messages'),
        BottomNavigationBarItem(icon: Icon(Icons.grid_view), label: 'More'),
      ];
    } else if (role == UserRole.staff) {
      items = const [
        BottomNavigationBarItem(icon: Icon(Icons.home_outlined), activeIcon: Icon(Icons.home), label: 'Home'),
        BottomNavigationBarItem(icon: Icon(Icons.check_box_outlined), activeIcon: Icon(Icons.check_box), label: 'Tasks'),
        BottomNavigationBarItem(icon: Icon(Icons.person_outline), activeIcon: Icon(Icons.person), label: 'Profile'),
        BottomNavigationBarItem(icon: Icon(Icons.grid_view), label: 'More'),
      ];
    } else {
      items = const [
        BottomNavigationBarItem(icon: Icon(Icons.home_outlined), activeIcon: Icon(Icons.home), label: 'Home'),
        BottomNavigationBarItem(icon: Icon(Icons.notifications_none), activeIcon: Icon(Icons.notifications), label: 'Notices'),
        BottomNavigationBarItem(icon: Icon(Icons.person_outline), activeIcon: Icon(Icons.person), label: 'Profile'),
        BottomNavigationBarItem(icon: Icon(Icons.grid_view), label: 'More'),
      ];
    }

    return BottomNavigationBar(
      currentIndex: _currentIndex,
      onTap: (index) {
        setState(() => _currentIndex = index);
        if (index == 1 && role == UserRole.student) {
          _navigateTo(context, const NotificationsScreen());
        } else if (index == 2 && role == UserRole.student) {
          _navigateTo(context, const DigitalIdScreen());
        } else if (index == 3) {
          _navigateTo(context, const LibraryScreen());
        }
      },
      items: items,
    );
  }

  String _getRoleTitle(UserRole role) {
    switch (role) {
      case UserRole.student:
        return 'Student';
      case UserRole.parent:
        return 'Parent';
      case UserRole.teacher:
        return 'Teacher';
      case UserRole.staff:
        return 'Staff';
      default:
        return 'Portal';
    }
  }
}
