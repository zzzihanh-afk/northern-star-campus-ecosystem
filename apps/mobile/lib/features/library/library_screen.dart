import 'package:flutter/material.dart';
import '../../core/theme/campus_theme.dart';
import '../../core/supabase_client.dart';

class BookItemModel {
  final String id;
  final String title;
  final String category;
  final String author;
  final String coverUrl;
  final int totalCopies;
  final int availableCopies;

  BookItemModel({
    required this.id,
    required this.title,
    required this.category,
    required this.author,
    required this.coverUrl,
    this.totalCopies = 5,
    this.availableCopies = 5,
  });
}

class LibraryScreen extends StatefulWidget {
  const LibraryScreen({Key? key}) : super(key: key);

  @override
  State<LibraryScreen> createState() => _LibraryScreenState();
}

class _LibraryScreenState extends State<LibraryScreen> {
  final List<String> borrowed = [];
  String _activeTab = 'all'; // 'all' or 'my'
  String _searchQuery = '';
  bool _isLoading = false;

  List<BookItemModel> _books = [
    BookItemModel(
      id: 'bk-1',
      title: 'Science Today',
      category: 'Science',
      author: 'Dr. Farhad Hossain',
      coverUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300',
    ),
    BookItemModel(
      id: 'bk-2',
      title: 'Mathematics Guide',
      category: 'Mathematics',
      author: 'Prof. Nazmul Haque',
      coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300',
    ),
    BookItemModel(
      id: 'bk-3',
      title: 'English Grammar in Use',
      category: 'Language',
      author: 'Raymond Murphy',
      coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300',
    ),
  ];

  @override
  void initState() {
    super.initState();
    _fetchBooksFromSupabase();
  }

  Future<void> _fetchBooksFromSupabase() async {
    final client = SupabaseService.client;
    if (client != null) {
      setState(() => _isLoading = true);
      try {
        final List<dynamic> res = await client
            .from('books')
            .select()
            .order('created_at', ascending: false);

        if (res.isNotEmpty) {
          final fetched = res.map((b) => BookItemModel(
            id: b['id']?.toString() ?? '',
            title: b['title']?.toString() ?? 'Untitled Book',
            category: 'Educational',
            author: b['author']?.toString() ?? 'Faculty',
            coverUrl: b['cover_image_url']?.toString() ??
                'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300',
            totalCopies: b['total_copies'] is int ? b['total_copies'] : 5,
            availableCopies: b['available_copies'] is int ? b['available_copies'] : 5,
          )).toList();

          if (mounted) {
            setState(() {
              _books = fetched;
              _isLoading = false;
            });
          }
          return;
        }
      } catch (e) {
        print('[LibraryScreen] Supabase query notice: $e');
      }
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final filtered = _books.where((b) {
      final matchesSearch = b.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          b.author.toLowerCase().contains(_searchQuery.toLowerCase());
      if (_activeTab == 'my') {
        return matchesSearch && borrowed.contains(b.title);
      }
      return matchesSearch;
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Library Catalogue'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, size: 20),
            tooltip: 'Sync with live database',
            onPressed: _fetchBooksFromSupabase,
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Search Input
            TextField(
              onChanged: (val) => setState(() => _searchQuery = val),
              decoration: InputDecoration(
                hintText: 'Search books by title or author...',
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
                  onPressed: () => setState(() => _activeTab = 'all'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _activeTab == 'all' ? CampusTheme.royalBlue : Colors.white,
                    foregroundColor: _activeTab == 'all' ? Colors.white : const Color(0xFF64748B),
                    elevation: _activeTab == 'all' ? 2 : 0,
                    side: BorderSide(color: _activeTab == 'all' ? Colors.transparent : const Color(0xFFE2E8F0)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  ),
                  child: Text('All Books (${_books.length})', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 11)),
                ),
                const SizedBox(width: 8),
                OutlinedButton(
                  onPressed: () => setState(() => _activeTab = 'my'),
                  style: OutlinedButton.styleFrom(
                    backgroundColor: _activeTab == 'my' ? CampusTheme.royalBlue : Colors.white,
                    foregroundColor: _activeTab == 'my' ? Colors.white : const Color(0xFF64748B),
                    side: BorderSide(color: _activeTab == 'my' ? Colors.transparent : const Color(0xFFE2E8F0)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  ),
                  child: Text('Borrowed (${borrowed.length})', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 11)),
                ),
              ],
            ),

            const SizedBox(height: 16),

            if (_isLoading)
              const Center(
                child: Padding(
                  padding: EdgeInsets.all(32.0),
                  child: CircularProgressIndicator(),
                ),
              )
            else if (filtered.isEmpty)
              Center(
                child: Padding(
                  padding: const EdgeInsets.all(40.0),
                  child: Column(
                    children: const [
                      Icon(Icons.menu_book, size: 48, color: Color(0xFFCBD5E1)),
                      SizedBox(height: 12),
                      Text('No books found', style: TextStyle(fontWeight: FontWeight.w700, color: Color(0xFF64748B))),
                    ],
                  ),
                ),
              )
            else
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: filtered.length,
                separatorBuilder: (_, __) => const SizedBox(height: 12),
                itemBuilder: (context, index) {
                  return _buildBookCard(filtered[index]);
                },
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildBookCard(BookItemModel book) {
    final isBorrowed = borrowed.contains(book.title);

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 4, offset: const Offset(0, 2)),
        ],
      ),
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Image.network(
              book.coverUrl,
              width: 50,
              height: 68,
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(
                width: 50,
                height: 68,
                color: const Color(0xFFE2E8F0),
                child: const Icon(Icons.book, color: Color(0xFF94A3B8)),
              ),
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  book.title,
                  style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: CampusTheme.navyDark),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 2),
                Text(
                  book.author,
                  style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: Color(0xFF64748B)),
                ),
                const SizedBox(height: 4),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEFF6FF),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    book.category,
                    style: const TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: CampusTheme.royalBlue),
                  ),
                ),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: isBorrowed
                ? null
                : () {
                    setState(() {
                      borrowed.add(book.title);
                    });
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Borrowed "${book.title}" successfully.')),
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
