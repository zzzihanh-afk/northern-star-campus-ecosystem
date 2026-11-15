import 'package:flutter/material.dart';
import '../../core/theme/campus_theme.dart';

class LibraryScreen extends StatefulWidget {
  const LibraryScreen({Key? key}) : super(key: key);

  @override
  State<LibraryScreen> createState() => _LibraryScreenState();
}

class _LibraryScreenState extends State<LibraryScreen> {
  final List<String> borrowed = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Library'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Search Input
            TextField(
              decoration: InputDecoration(
                hintText: 'Search books...',
                hintStyle: const TextStyle(fontSize: 12, color: Color(0xFF94A3B8)),
                prefixIcon: const Icon(Icons.search, size: 20, color: Color(0xFF94A3B8)),
                filled: true,
                fillColor: Colors.white,
                contentPadding: const EdgeInsets.symmetric(vertical: 10),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: const BorderSide(color: Color(0xFFE2E8F0))),
                enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: const BorderSide(color: Color(0xFFE2E8F0))),
              ),
            ),

            const SizedBox(height: 14),

            // Tab Filters
            Row(
              children: [
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: CampusTheme.royalBlue,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  ),
                  child: const Text('All Books', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 11)),
                ),
                const SizedBox(width: 8),
                OutlinedButton(
                  onPressed: () {},
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color(0xFF64748B),
                    side: const BorderSide(color: Color(0xFFE2E8F0)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  ),
                  child: Text('My Books (${borrowed.length})', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 11)),
                ),
              ],
            ),

            const SizedBox(height: 16),

            // Books List (Science Today, Mathematics Guide, English Grammar)
            _buildBookCard(
              'Science Today',
              'Educational',
              'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100',
            ),
            const SizedBox(height: 12),
            _buildBookCard(
              'Mathematics Guide',
              'Educational',
              'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=100',
            ),
            const SizedBox(height: 12),
            _buildBookCard(
              'English Grammar',
              'Language',
              'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=100',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBookCard(String title, String category, String coverUrl) {
    final isBorrowed = borrowed.contains(title);

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 64,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              image: DecorationImage(image: NetworkImage(coverUrl), fit: BoxFit.cover),
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: CampusTheme.navyDark)),
                const SizedBox(height: 2),
                Text(category, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: CampusTheme.royalBlue)),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: isBorrowed
                ? null
                : () {
                    setState(() {
                      borrowed.add(title);
                    });
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Borrowed "$title" successfully.')),
                    );
                  },
            style: ElevatedButton.styleFrom(
              backgroundColor: isBorrowed ? const Color(0xFFE2E8F0) : CampusTheme.royalBlue,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: Text(isBorrowed ? 'Borrowed' : 'Borrow', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
          ),
        ],
      ),
    );
  }
}
