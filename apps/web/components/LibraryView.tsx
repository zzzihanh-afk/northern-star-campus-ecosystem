'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  BookOpen,
  Search,
  Plus,
  Filter,
  CheckCircle,
  Clock,
  RotateCcw,
  BookMarked,
  Layers,
  Users,
  AlertCircle,
  X,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash2,
} from 'lucide-react';

interface BookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  available: number;
  total: number;
  cover: string;
}

interface IssuedRecord {
  id: string;
  studentName: string;
  studentCode: string;
  className: string;
  bookTitle: string;
  issueDate: string;
  dueDate: string;
  status: 'active' | 'returned' | 'overdue';
}

export const LibraryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'catalogue' | 'issued'>('catalogue');

  const [books, setBooks] = useState<BookItem[]>([
    {
      id: 'bk-1',
      title: 'Science Today',
      author: 'Dr. Farhad Hossain',
      category: 'Science',
      isbn: '978-0123456789',
      available: 5,
      total: 5,
      cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300',
    },
    {
      id: 'bk-2',
      title: 'Higher Mathematics Guide',
      author: 'Prof. Nazmul Haque',
      category: 'Mathematics',
      isbn: '978-0987654321',
      available: 8,
      total: 10,
      cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300',
    },
    {
      id: 'bk-3',
      title: 'English Grammar in Use',
      author: 'Raymond Murphy',
      category: 'Language',
      isbn: '978-1108457651',
      available: 4,
      total: 6,
      cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300',
    },
    {
      id: 'bk-4',
      title: 'Physics Principles & Practice',
      author: 'Dr. Shahjahan Tapan',
      category: 'Science',
      isbn: '978-9844012011',
      available: 12,
      total: 15,
      cover: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300',
    },
    {
      id: 'bk-5',
      title: 'Bangla Sahitya Sangkalan',
      author: 'National Curriculum Board',
      category: 'Language',
      isbn: '978-9843345112',
      available: 14,
      total: 20,
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300',
    },
    {
      id: 'bk-6',
      title: 'Introduction to Computer Science',
      author: 'J. Glenn Brookshear',
      category: 'Technology',
      isbn: '978-0134875461',
      available: 7,
      total: 8,
      cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300',
    },
  ]);

  // Fetch live books from Supabase if configured
  useEffect(() => {
    async function loadBooks() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
        if (data && !error && data.length > 0) {
          const mapped: BookItem[] = data.map((b: any) => ({
            id: b.id,
            title: b.title,
            author: b.author || 'Faculty & Curators',
            category: 'General',
            isbn: b.isbn || 'N/A',
            available: b.available_copies ?? b.total_copies ?? 5,
            total: b.total_copies ?? 5,
            cover: b.cover_image_url || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300',
          }));
          setBooks(mapped);
        }
      } catch (err) {
        console.warn('Failed to fetch books from Supabase:', err);
      }
    }
    loadBooks();
  }, []);

  const [issuedRecords, setIssuedRecords] = useState<IssuedRecord[]>([
    {
      id: 'iss-1',
      studentName: 'Rahim Ahmed',
      studentCode: 'NSC2025001',
      className: 'Class 9-A',
      bookTitle: 'Higher Mathematics Guide',
      issueDate: '2025-11-02',
      dueDate: '2025-11-16',
      status: 'active',
    },
    {
      id: 'iss-2',
      studentName: 'Sumaiya Akter',
      studentCode: 'NSC2025002',
      className: 'Class 10-B',
      bookTitle: 'English Grammar in Use',
      issueDate: '2025-11-01',
      dueDate: '2025-11-15',
      status: 'active',
    },
    {
      id: 'iss-3',
      studentName: 'Tanvir Hasan',
      studentCode: 'NSC2025010',
      className: 'HSC 1st Year',
      bookTitle: 'Physics Principles & Practice',
      issueDate: '2025-10-20',
      dueDate: '2025-11-03',
      status: 'overdue',
    },
    {
      id: 'iss-4',
      studentName: 'Nusrat Jahan',
      studentCode: 'NSC2025015',
      className: 'Class 8-A',
      bookTitle: 'Science Today',
      issueDate: '2025-10-25',
      dueDate: '2025-11-08',
      status: 'returned',
    },
  ]);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedBookForIssue, setSelectedBookForIssue] = useState<BookItem | null>(null);

  // New book form
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('Science');
  const [newIsbn, setNewIsbn] = useState('');
  const [newCopies, setNewCopies] = useState(5);
  const [newCover, setNewCover] = useState('');
  const [coverMode, setCoverMode] = useState<'upload' | 'url' | 'preset'>('upload');

  const PRESET_COVERS = [
    { name: 'Science', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300' },
    { name: 'Mathematics', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300' },
    { name: 'Language', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300' },
    { name: 'Physics', url: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300' },
    { name: 'Literature', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300' },
    { name: 'Technology', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300' },
  ];

  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCover(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Issue form
  const [issueStudentName, setIssueStudentName] = useState('');
  const [issueStudentCode, setIssueStudentCode] = useState('');
  const [issueClassName, setIssueClassName] = useState('Class 9-A');
  const [issueBookTitle, setIssueBookTitle] = useState('');

  const categories = ['All', 'Science', 'Mathematics', 'Language', 'Technology'];

  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newBook: BookItem = {
      id: `bk-${Date.now()}`,
      title: newTitle,
      author: newAuthor || 'Unknown Author',
      category: newCategory,
      isbn: newIsbn || `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      available: Number(newCopies) || 5,
      total: Number(newCopies) || 5,
      cover: newCover || PRESET_COVERS[0].url,
    };
    setBooks([newBook, ...books]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('books').insert({
          institution_id: process.env.NEXT_PUBLIC_DEFAULT_INSTITUTION_ID || 'a0000000-0000-0000-0000-000000000001',
          title: newBook.title,
          author: newBook.author,
          isbn: newBook.isbn,
          total_copies: newBook.total,
          available_copies: newBook.available,
          cover_image_url: newBook.cover,
        });
      } catch (err) {
        console.warn('Live Supabase book sync notice:', err);
      }
    }

    setShowAddModal(false);
    setNewTitle('');
    setNewAuthor('');
    setNewIsbn('');
    setNewCopies(5);
    setNewCover('');
  };

  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueStudentName.trim() || !issueBookTitle.trim()) return;

    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + 14);

    const newRecord: IssuedRecord = {
      id: `iss-${Date.now()}`,
      studentName: issueStudentName,
      studentCode: issueStudentCode || 'NSC2025' + Math.floor(100 + Math.random() * 900),
      className: issueClassName,
      bookTitle: issueBookTitle,
      issueDate: today.toISOString().split('T')[0],
      dueDate: due.toISOString().split('T')[0],
      status: 'active',
    };

    setIssuedRecords([newRecord, ...issuedRecords]);
    // decrease available copies
    setBooks(
      books.map((b) =>
        b.title.toLowerCase() === issueBookTitle.toLowerCase() && b.available > 0
          ? { ...b, available: b.available - 1 }
          : b
      )
    );

    setShowIssueModal(false);
    setIssueStudentName('');
    setIssueStudentCode('');
    setIssueBookTitle('');
  };

  const handleReturnBook = (id: string, bookTitle: string) => {
    setIssuedRecords(
      issuedRecords.map((r) => (r.id === id ? { ...r, status: 'returned' as const } : r))
    );
    setBooks(
      books.map((b) =>
        b.title.toLowerCase() === bookTitle.toLowerCase() && b.available < b.total
          ? { ...b, available: b.available + 1 }
          : b
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
              Digital Library & Curriculum Circulation
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Curriculum catalogue, ISBN tracking, student lending circulation & digital reference resources.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setIssueBookTitle(books[0]?.title || '');
              setShowIssueModal(true);
            }}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <BookMarked className="w-4 h-4" />
            <span>Issue Book</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Book</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Total Catalogued</span>
            <span className="text-lg font-black text-slate-900">1,850 Books</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Currently Borrowed</span>
            <span className="text-lg font-black text-amber-600">142 Books</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Available on Shelves</span>
            <span className="text-lg font-black text-emerald-600">1,708 Copies</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Active Members</span>
            <span className="text-lg font-black text-purple-600">840 Students</span>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs & Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('catalogue')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'catalogue'
                ? 'bg-[#0B1E38] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Book Catalogue ({filteredBooks.length})
          </button>
          <button
            onClick={() => setActiveTab('issued')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'issued'
                ? 'bg-[#0B1E38] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Borrowing Circulation</span>
            <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px]">
              {issuedRecords.filter((r) => r.status === 'active').length}
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-2 flex-1 sm:max-w-md justify-end">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search books, authors, ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {activeTab === 'catalogue' && (
            <div className="flex space-x-1 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. TAB CONTENT: BOOK CATALOGUE */}
      {activeTab === 'catalogue' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex space-x-4"
            >
              <div className="w-20 h-28 relative rounded-xl overflow-hidden bg-gradient-to-br from-[#081528] to-[#122b52] border border-blue-900/40 text-white shadow-sm shrink-0 flex flex-col justify-between p-2.5">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}
                <span className="text-[8px] font-bold uppercase tracking-wider text-amber-400 truncate z-10">
                  {book.category}
                </span>
                <BookOpen className="w-6 h-6 text-blue-400/50 self-center z-10" />
                <span className="text-[9px] font-bold text-slate-100 line-clamp-2 leading-tight z-10">
                  {book.title}
                </span>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {book.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{book.isbn}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1 truncate" title={book.title}>
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">{book.author}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      book.available > 0
                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        : 'text-rose-700 bg-rose-50 border border-rose-200'
                    }`}
                  >
                    {book.available} / {book.total} Copies Available
                  </span>
                  <button
                    onClick={() => {
                      setSelectedBookForIssue(book);
                      setIssueBookTitle(book.title);
                      setShowIssueModal(true);
                    }}
                    disabled={book.available === 0}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 disabled:opacity-40 disabled:hover:text-blue-600"
                  >
                    Issue
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. TAB CONTENT: BORROWING CIRCULATION */}
      {activeTab === 'issued' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Current Borrowing Records</h3>
              <p className="text-xs text-slate-400">
                Track active book loans, return due dates, and student library history.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">Class</th>
                  <th className="py-2.5 px-3">Book Title</th>
                  <th className="py-2.5 px-3">Issue Date</th>
                  <th className="py-2.5 px-3">Due Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {issuedRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900 block">{r.studentName}</span>
                      <span className="text-[10px] font-mono text-slate-400">{r.studentCode}</span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700">{r.className}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{r.bookTitle}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{r.issueDate}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-700 font-semibold">{r.dueDate}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.status === 'active'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : r.status === 'overdue'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {r.status === 'active'
                          ? 'Active Loan'
                          : r.status === 'overdue'
                          ? 'Overdue'
                          : 'Returned'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {r.status !== 'returned' ? (
                        <button
                          onClick={() => handleReturnBook(r.id, r.bookTitle)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-lg text-[11px] font-bold text-slate-700 transition-all flex items-center space-x-1 ml-auto"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Return</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-semibold">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add New Book */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Add Book to Library</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddBook} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Book Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Higher Secondary Chemistry"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Author</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prof. Shamsul Islam"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              {/* Book Cover Image Option */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">Book Cover Image</label>
                  {newCover && (
                    <button
                      type="button"
                      onClick={() => setNewCover('')}
                      className="text-[10px] text-rose-500 hover:text-rose-700 font-semibold flex items-center space-x-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                {/* Cover Mode Selector */}
                <div className="flex bg-slate-100 p-1 rounded-xl mb-2 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setCoverMode('upload')}
                    className={`flex-1 py-1 rounded-lg transition-all flex items-center justify-center space-x-1 ${
                      coverMode === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverMode('url')}
                    className={`flex-1 py-1 rounded-lg transition-all flex items-center justify-center space-x-1 ${
                      coverMode === 'url' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <LinkIcon className="w-3 h-3" />
                    <span>Image URL</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverMode('preset')}
                    className={`flex-1 py-1 rounded-lg transition-all flex items-center justify-center space-x-1 ${
                      coverMode === 'preset' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Presets</span>
                  </button>
                </div>

                {/* Mode: Upload */}
                {coverMode === 'upload' && (
                  <div className="flex items-center space-x-3">
                    <label className="flex-1 cursor-pointer border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-3 text-center bg-slate-50 hover:bg-blue-50/50 transition-all block">
                      <Upload className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <span className="text-[11px] font-bold text-slate-700 block">Choose book cover image</span>
                      <span className="text-[9px] text-slate-400 block">PNG, JPG, WebP (Max 5MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverFileUpload}
                        className="hidden"
                      />
                    </label>
                    {newCover && (
                      <div className="w-14 h-20 rounded-xl overflow-hidden border border-slate-300 shrink-0 relative shadow-sm">
                        <img src={newCover} alt="Cover preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                )}

                {/* Mode: URL */}
                {coverMode === 'url' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="url"
                      placeholder="https://example.com/cover.jpg"
                      value={newCover}
                      onChange={(e) => setNewCover(e.target.value)}
                      className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                    {newCover && (
                      <div className="w-10 h-14 rounded-lg overflow-hidden border border-slate-300 shrink-0 relative shadow-sm">
                        <img
                          src={newCover}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Mode: Presets */}
                {coverMode === 'preset' && (
                  <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-50 rounded-xl border border-slate-200">
                    {PRESET_COVERS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setNewCover(preset.url)}
                        className={`p-1 rounded-lg border text-left flex items-center space-x-1.5 transition-all ${
                          newCover === preset.url
                            ? 'bg-blue-50 border-blue-600 ring-1 ring-blue-600'
                            : 'bg-white hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <div className="w-5 h-7 rounded shrink-0 overflow-hidden bg-slate-200">
                          <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-700 truncate">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Language">Language</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Copies</label>
                  <input
                    type="number"
                    min="1"
                    value={newCopies}
                    onChange={(e) => setNewCopies(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ISBN (Optional)</label>
                <input
                  type="text"
                  placeholder="978-XXXXXXXXXX"
                  value={newIsbn}
                  onChange={(e) => setNewIsbn(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
                >
                  Save Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Issue Book to Student */}
      {showIssueModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Issue Book to Student</h3>
              <button onClick={() => setShowIssueModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleIssueBook} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Selected Book</label>
                <input
                  type="text"
                  required
                  value={issueBookTitle}
                  onChange={(e) => setIssueBookTitle(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-100 border border-slate-200 rounded-xl font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahim Ahmed"
                  value={issueStudentName}
                  onChange={(e) => setIssueStudentName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student Code</label>
                  <input
                    type="text"
                    placeholder="NSC2025001"
                    value={issueStudentCode}
                    onChange={(e) => setIssueStudentCode(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class / Section</label>
                  <input
                    type="text"
                    value={issueClassName}
                    onChange={(e) => setIssueClassName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <div className="p-2.5 bg-amber-50 rounded-xl text-[11px] text-amber-700 flex items-center space-x-2">
                <Clock className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Standard borrowing term is 14 days from issue date.</span>
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20"
                >
                  Issue Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
