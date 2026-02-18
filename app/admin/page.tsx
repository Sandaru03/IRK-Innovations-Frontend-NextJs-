"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, LogOut, LayoutDashboard, Link as LinkIcon, Edit2, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

const Dashboard = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    mainImage: '',
    detailImages: [],
    liveLink: ''
  });
  const [uploading, setUploading] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/adminlogin');
    }
  }, [router]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const response = await axios.get(`${apiUrl}/projects`);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/adminlogin');
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e: any, type: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (type === 'detailImages') {
      if ((formData.detailImages as string[]).length + files.length > 8) {
        alert('You can only add a maximum of 8 detail images.');
        return;
      }
    }

    setUploading(true);
    try {
      if (type === 'mainImage') {
        const file = files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images') // Use 'images' bucket
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        setFormData(prev => ({ ...prev, [type]: data.publicUrl }));
      } else if (type === 'detailImages') {
        const uploadedUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${i}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('images') // Use 'images' bucket
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data } = supabase.storage.from('images').getPublicUrl(filePath);
          uploadedUrls.push(data.publicUrl);
        }
        setFormData((prev: any) => ({ ...prev, detailImages: [...prev.detailImages, ...uploadedUrls] }));
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      alert('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeDetailImage = (indexToRemove: number) => {
    setFormData((prev: any) => ({
      ...prev,
      detailImages: prev.detailImages.filter((_: any, index: number) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      if (editingProject) {
        await axios.put(`${apiUrl}/projects/${editingProject._id}`, formData, config);
      } else {
        await axios.post(`${apiUrl}/projects`, formData, config);
      }
      
      fetchProjects();
      closeModal();
    } catch (error) {
      alert('Error saving project');
      console.error(error);
    }
  };

  const openModal = (project: any = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        shortDescription: project.shortDescription || '',
        mainImage: project.mainImage,
        detailImages: project.detailImages || [],
        liveLink: project.liveLink || ''
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        shortDescription: '',
        mainImage: '',
        detailImages: [],
        liveLink: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      shortDescription: '',
      mainImage: '',
      detailImages: [],
      liveLink: ''
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        await axios.delete(`${apiUrl}/projects/${id}`, config);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex font-sans selection:bg-emerald-500 selection:text-white">
      {/* Sidebar - Modern Dark Gradient */}
      <aside className="w-72 bg-linear-to-b from-slate-900 to-slate-800 text-white shadow-2xl hidden md:flex h-screen fixed top-0 left-0 z-40 flex-col justify-between border-r border-white/10">
        <div>
          <div className="p-8">
            <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3 bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              <LayoutDashboard className="w-8 h-8 text-emerald-400" />
              IRK Admin
            </h1>
            <p className="text-slate-400 text-xs mt-2 font-medium tracking-wider uppercase">Control Panel</p>
          </div>
          <nav className="mt-8 px-6 space-y-3">
            <a href="#" className="flex items-center gap-4 px-6 py-4 bg-emerald-600/20 text-emerald-300 rounded-2xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all cursor-pointer">
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-bold">Projects</span>
            </a>
            <a href="/" target="_blank" className="flex items-center gap-4 px-6 py-4 text-slate-400 hover:bg-white/5 hover:text-white rounded-2xl transition-all cursor-pointer group">
              <LinkIcon className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />
              <span className="font-medium">Live Website</span>
            </a>
          </nav>
        </div>
        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-4 text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full rounded-2xl transition-all cursor-pointer font-bold tracking-wide"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 ml-0 md:ml-72 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
           <div>
              <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">Project Management</h2>
              <p className="text-slate-500 mt-2 text-lg">Manage and update your portfolio efficiently.</p>
           </div>
          
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer font-bold text-lg"
          >
            <Plus className="w-6 h-6" />
            Add Project
          </button>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <Loader className="w-12 h-12 text-emerald-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project._id} className="group bg-white dark:bg-zinc-800 rounded-3xl shadow-xl hover:shadow-2xl border border-slate-100 dark:border-zinc-700 overflow-hidden transition-all duration-500 hover:-translate-y-2">
                <div className="h-64 overflow-hidden relative">
                  <img src={project.mainImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <button
                      onClick={() => openModal(project)}
                      className="p-3 bg-white/90 backdrop-blur-md text-emerald-600 rounded-full hover:bg-white hover:scale-110 shadow-lg transition-all cursor-pointer"
                      title="Edit Project"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-3 bg-white/90 backdrop-blur-md text-red-500 rounded-full hover:bg-white hover:scale-110 shadow-lg transition-all cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl text-slate-800 dark:text-white mb-3 leading-tight">{project.title}</h3>
                  <p className="text-slate-500 dark:text-zinc-400 text-base line-clamp-2 leading-relaxed">{project.shortDescription || project.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal - Modern Glassmorphism */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto scale-100 animate-in zoom-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md px-8 py-6 border-b border-slate-100 dark:border-zinc-700 flex justify-between items-center">
                <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                  {editingProject ? 'Edit Project' : 'New Project'}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-zinc-700 rounded-full transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Project Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-slate-50 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 text-slate-800 p-4 transition-all font-medium"
                            placeholder="e.g. Smart Automation System"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Live Link</label>
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                name="liveLink"
                                value={formData.liveLink}
                                onChange={handleChange}
                                className="w-full rounded-xl bg-slate-50 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 text-slate-800 p-4 pl-12 transition-all font-medium"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Short Description</label>
                    <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        rows={2}
                        className="w-full rounded-xl bg-slate-50 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 text-slate-800 p-4 transition-all"
                        required
                        placeholder="A brief summary for the card view..."
                    ></textarea>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Full Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={6}
                        className="w-full rounded-xl bg-slate-50 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 text-slate-800 p-4 transition-all leading-relaxed"
                        required
                        placeholder="Detailed explanation of the project features and technologies..."
                    ></textarea>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-slate-100">
                    {/* Main Image Upload */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex justify-between">
                          <span>Main Cover Image</span>
                          {formData.mainImage && <span className="text-emerald-600 text-xs bg-emerald-50 px-2 py-1 rounded-md">Uploaded</span>}
                      </label>
                      <div className="flex items-start gap-6">
                        <div className="hidden md:block w-32 h-20 rounded-lg overflow-hidden bg-slate-100 shadow-inner shrink-0">
                           {formData.mainImage ? (
                               <img src={formData.mainImage} alt="Main" className="w-full h-full object-cover" />
                           ) : (
                               <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
                           )}
                        </div>
                        <label className="flex-1 cursor-pointer group">
                             <div className="w-full border-2 border-dashed border-slate-300 group-hover:border-emerald-500 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all bg-slate-50 group-hover:bg-emerald-50/30">
                                 <Plus className="w-8 h-8 text-slate-400 group-hover:text-emerald-500 mb-2 transition-colors" />
                                 <span className="text-slate-600 font-medium group-hover:text-emerald-600">Click to upload cover image</span>
                                 <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'mainImage')}
                                    className="hidden"
                                    disabled={uploading}
                                 />
                             </div>
                        </label>
                      </div>
                    </div>

                    {/* Detail Images Upload */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Gallery Images (Max 8)
                      </label>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                          {(formData.detailImages as any[]).map((img, idx) => (
                             <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group shadow-md hover:shadow-lg transition-all">
                               <img src={img} alt={`Detail ${idx}`} className="w-full h-full object-cover"/>
                               <button
                                 type="button"
                                 onClick={() => removeDetailImage(idx)}
                                 className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 hover:scale-110 transition-all cursor-pointer shadow-lg"
                               >
                                 <Trash2 size={14} />
                               </button>
                             </div>
                          ))}
                          
                           {/* Upload Button Block */}
                           {(formData.detailImages as any[]).length < 8 && (
                               <label className="aspect-square cursor-pointer group">
                                 <div className="w-full h-full border-2 border-dashed border-slate-300 group-hover:border-emerald-500 rounded-xl flex flex-col items-center justify-center text-center transition-all bg-slate-50 group-hover:bg-emerald-50/30">
                                     <Plus className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 mb-1" />
                                     <span className="text-xs text-slate-500 font-bold uppercase tracking-wider group-hover:text-emerald-600">Add Image</span>
                                     <input
                                       type="file"
                                       accept="image/*"
                                       multiple
                                       onChange={(e) => handleFileUpload(e, 'detailImages')}
                                       className="hidden"
                                       disabled={uploading}
                                     />
                                 </div>
                               </label>
                           )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition-colors cursor-pointer"
                      disabled={uploading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                      disabled={uploading}
                    >
                       {uploading && <Loader className="w-5 h-5 animate-spin" />}
                       {uploading ? 'Uploading...' : 'Save Project'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
