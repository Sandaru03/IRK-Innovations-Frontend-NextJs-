import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, LogOut, LayoutDashboard, Image as ImageIcon, Link as LinkIcon, Edit2, Video, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
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
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/adminlogin');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e, type) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (type === 'detailImages') {
      if (formData.detailImages.length + files.length > 8) {
        alert('You can only add a maximum of 8 detail images.');
        return;
      }
    }

    setUploading(true);
    try {
      if (type === 'mainImage') {
        const file = files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images') // Use 'images' bucket
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        setFormData(prev => ({ ...prev, [type]: data.publicUrl }));
      } else if (type === 'detailImages') {
        const uploadedUrls = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}-${i}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('images') // Use 'images' bucket
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data } = supabase.storage.from('images').getPublicUrl(filePath);
          uploadedUrls.push(data.publicUrl);
        }
        setFormData(prev => ({ ...prev, detailImages: [...prev.detailImages, ...uploadedUrls] }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeDetailImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      detailImages: prev.detailImages.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await axios.put(`${import.meta.env.VITE_API_URL}/projects/${editingProject._id}`, formData, config);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/projects`, formData, config);
      }
      
      fetchProjects();
      closeModal();
    } catch (error) {
      alert('Error saving project');
      console.error(error);
    }
  };

  const openModal = (project = null) => {
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`, config);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-800 shadow-lg hidden md:flex h-screen fixed top-0 left-0 z-40 flex-col justify-between">
        <div>
          <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8" />
            Admin Panel
          </h1>
        </div>
          <nav className="mt-6 px-4 space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <LayoutDashboard className="w-5 h-5" />
              Projects
            </a>
            <a href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-700/50 rounded-lg transition-colors">
              <LinkIcon className="w-5 h-5" />
              Go to Home
            </a>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-zinc-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-0 md:ml-64 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Project Management</h2>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Project
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <div className="h-48 overflow-hidden relative group">
                <img src={project.mainImage} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => openModal(project)}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mb-4">{project.shortDescription || project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white p-2 border"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Short Description</label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows="2"
                    className="w-full rounded-lg border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white p-2 border"
                    required
                    placeholder="Brief summary for the project card..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Full Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full rounded-lg border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white p-2 border"
                    required
                    placeholder="Detailed project description..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Main Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Main Image</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'mainImage')}
                        className="w-full rounded-lg border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white p-2 border"
                        disabled={uploading}
                      />
                      {formData.mainImage && (
                        <div className="h-10 w-10 shrink-0 rounded overflow-hidden">
                          <img src={formData.mainImage} alt="Main" className="h-full w-full object-cover"/>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Detail Images Upload */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Detail Images (Max 8) - {formData.detailImages.length}/8
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload(e, 'detailImages')}
                      className="w-full rounded-lg border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white p-2 border"
                      disabled={uploading || formData.detailImages.length >= 8}
                    />
                     {formData.detailImages.length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {formData.detailImages.map((img, idx) => (
                             <div key={idx} className="relative h-16 w-16 rounded overflow-hidden group">
                               <img src={img} alt={`Detail ${idx}`} className="h-full w-full object-cover"/>
                               <button
                                 type="button"
                                 onClick={() => removeDetailImage(idx)}
                                 className="absolute top-0 right-0 bg-red-600 text-white p-0.5 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity"
                               >
                                 <Trash2 size={12} />
                               </button>
                             </div>
                          ))}
                        </div>
                      )}
                  </div>



                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Live Link (Optional)</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        name="liveLink"
                        value={formData.liveLink}
                        onChange={handleChange}
                        className="w-full rounded-lg border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white p-2 pl-9 border"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition"
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition flex items-center justify-center gap-2"
                    disabled={uploading}
                  >
                     {uploading && <Loader className="w-4 h-4 animate-spin" />}
                     {uploading ? 'Uploading...' : 'Save Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
