import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface HeaderProps {
    title: string
    subtitle?: string
    actions?: React.ReactNode
    className?: string
    showGradient?: boolean
}

export function Header({
    title,
    subtitle,
    actions,
    className,
    showGradient = true
}: HeaderProps) {
    return (
        <div className={cn('flex items-center justify-between space-y-2', className)}>
            <div className="flex-1">
                <h1 className={cn(
                    'text-3xl font-bold tracking-tight text-premium-bold',
                    showGradient && 'bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent'
                )}>
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-muted-foreground text-premium mt-2">
                        {subtitle}
                    </p>
                )}
            </div>
            {actions && (
                <div className="flex items-center space-x-2">
                    {actions}
                </div>
            )}
        </div>
    )
}

interface SectionHeaderProps {
    title: string
    description?: string
    badge?: string
    badgeVariant?: 'default' | 'secondary' | 'destructive' | 'premium'
    className?: string
}

export function SectionHeader({
    title,
    description,
    badge,
    badgeVariant = 'default',
    className
}: SectionHeaderProps) {
    return (
        <div className={cn('space-y-2', className)}>
            <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold text-premium-bold">
                    {title}
                </h2>
                {badge && (
                    <Badge variant={badgeVariant} className="text-xs">
                        {badge}
                    </Badge>
                )}
            </div>
            {description && (
                <p className="text-sm text-muted-foreground text-premium">
                    {description}
                </p>
            )}
        </div>
    )
}

interface PageHeaderProps {
    title: string
    subtitle?: string
    breadcrumbs?: string[]
    actions?: React.ReactNode
    className?: string
}

export function PageHeader({
    title,
    subtitle,
    breadcrumbs,
    actions,
    className
}: PageHeaderProps) {
    return (
        <div className={cn('space-y-6', className)}>
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            <span className="text-premium">{crumb}</span>
                            {index < breadcrumbs.length - 1 && (
                                <span className="text-muted-foreground">/</span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            )}

            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-lg text-muted-foreground text-premium">
                            {subtitle}
                        </p>
                    )}
                </div>
                {actions && (
                    <div className="flex items-center space-x-2">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    )
} 