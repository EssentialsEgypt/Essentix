import React from 'react'
import { cn } from '@/lib/utils'
import styles from './loading-spinner.module.css'

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
    text?: string
}

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    }

    return (
        <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
            <div
                className={cn(
                    'animate-spin rounded-full border-2 border-transparent',
                    'bg-gradient-to-r from-pink-500 to-purple-600',
                    'bg-clip-border',
                    sizeClasses[size],
                    styles.loadingSpinner
                )}
            />
            {text && (
                <p className="text-sm text-muted-foreground text-premium animate-pulse">
                    {text}
                </p>
            )}
        </div>
    )
}

export function LoadingDots({ className }: { className?: string }) {
    return (
        <div className={cn('flex space-x-1', className)}>
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className={cn(
                        "w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse",
                        styles.loadingDot
                    )}
                />
            ))}
        </div>
    )
}

export function LoadingSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('animate-pulse', className)}>
            <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded mb-2" />
            <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded mb-2 w-3/4" />
            <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-1/2" />
        </div>
    )
}

export function LoadingCard({ className }: { className?: string }) {
    return (
        <div className={cn('card-premium p-6 space-y-4', className)}>
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-3/4" />
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-1/2" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded" />
                <div className="h-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-5/6" />
                <div className="h-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-4/6" />
            </div>
        </div>
    )
} 