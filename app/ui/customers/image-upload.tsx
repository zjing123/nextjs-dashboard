'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { upload } from '@vercel/blob/client';
import { 
  CloudArrowUpIcon, 
  TrashIcon,
  XMarkIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

interface ImageUploaderProps {
  onUpload?: (url: string) => void;
  onDelete?: () => void;
  initialImageUrl?: string;
  className?: string;
}

export default function ImageUploader({ 
  onUpload, 
  onDelete, 
  initialImageUrl,
  className = '' 
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    console.log('文件选择:', file.name, file.type, file.size);
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      console.log('文件已选择，等待用户确认上传');
    } else {
      alert('请选择图片文件');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleUpload = async () => {
    console.log('开始上传，文件:', selectedFile?.name);
    if (!selectedFile) {
      console.log('没有选择文件');
      return;
    }

    setUploading(true);
    try {
      console.log('调用 Vercel Blob 上传...');
      const blob = await upload(selectedFile.name, selectedFile, {
        access: 'public',
        handleUploadUrl: '/api/avatar/upload',
      });
      
      console.log('上传成功:', blob.url);
      // 清理本地 blob URL
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(blob.url);
      onUpload?.(blob.url);
    } catch (error) {
      console.error('上传失败:', error);
      alert('上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = () => {
    // 清理本地 blob URL
    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onDelete?.();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (previewUrl && !previewUrl.startsWith('blob:')) {
    // 已上传的图片，显示预览和操作按钮
    return (
      <div className={`relative w-full sm:w-auto ${className}`}>
        <div className="relative w-full h-32 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
          <Image
            src={previewUrl}
            alt="预览图片"
            fill
            className="object-cover"
            sizes="128px"
          />
          
          {/* 操作按钮覆盖层 */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleClick}
                className="p-2 bg-white bg-opacity-90 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                title="Change"
              >
                <PencilSquareIcon className="w-4 h-4 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="p-2 bg-white bg-opacity-90 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                title="Delete"
              >
                <TrashIcon className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className={`w-full sm:w-auto ${className}`}>
      {selectedFile && previewUrl?.startsWith('blob:') ? (
        // 已选择文件，显示预览和上传按钮
        <div className="space-y-4">
          <div className="relative w-full h-32 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
            <Image
              src={previewUrl}
              alt="预览图片"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? '上传中...' : '确认上传'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="取消选择"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        // 未选择文件，显示上传区域
        <div
          className={`
            relative w-full h-32 sm:w-32 sm:h-32 border-2 border-dashed rounded-lg cursor-pointer
            transition-all duration-200 flex flex-col items-center justify-center
            ${dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <CloudArrowUpIcon className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600 font-medium">Upload</span>
          <span className="text-xs text-gray-400 mt-1">点击或拖拽上传</span>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}