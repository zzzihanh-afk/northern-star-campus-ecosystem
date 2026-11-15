import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import '../../core/theme/campus_theme.dart';

class DigitalIdScreen extends StatelessWidget {
  const DigitalIdScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My ID Card'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            // Student ID Card Body
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: const Color(0xFFE2E8F0)),
                boxShadow: [
                  BoxShadow(color: CampusTheme.navyDark.withOpacity(0.06), blurRadius: 16, offset: const Offset(0, 4)),
                ],
              ),
              child: Column(
                children: [
                  // Header Logo and Institution Name
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Image.asset('assets/images/logo.png', width: 32, height: 32),
                      const SizedBox(width: 8),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('NORTHERN STAR', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: CampusTheme.navyDark, letterSpacing: 0.5)),
                          Text('SCHOOL & COLLEGE', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: CampusTheme.goldAccent, letterSpacing: 0.5)),
                        ],
                      ),
                    ],
                  ),

                  const SizedBox(height: 16),

                  // Student Photo
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: CampusTheme.royalBlue, width: 2),
                      image: const DecorationImage(
                        image: NetworkImage('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),

                  const SizedBox(height: 12),
                  const Text('Rahim Ahmed', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w900, color: CampusTheme.navyDark)),
                  const SizedBox(height: 2),
                  const Text('Class: 9-A', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: CampusTheme.royalBlue)),
                  const SizedBox(height: 2),
                  const Text('ID: NSC2025001', style: TextStyle(fontSize: 11, fontFamily: 'monospace', fontWeight: FontWeight.w700, color: Color(0xFF64748B))),

                  const SizedBox(height: 20),

                  // High-Contrast QR Code
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF8FAFC),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    child: QrImageView(
                      data: 'NSSC_SECURE_TOKEN_RAHIM_AHMED_NSC2025001_VALID_2025_2026',
                      version: QrVersions.auto,
                      size: 140.0,
                      foregroundColor: CampusTheme.navyDark,
                    ),
                  ),

                  const SizedBox(height: 16),
                  const Text('Academic Year 2025-2026', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: Color(0xFF94A3B8))),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Download ID Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Digital Student ID pass saved to device.')),
                  );
                },
                icon: const Icon(Icons.download, size: 18),
                label: const Text('Download ID', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: CampusTheme.royalBlue,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
