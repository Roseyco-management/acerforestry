'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ClientDistributionChartProps {
  data: Array<{
    status: string
    count: number
    percentage: number
  }>
}

export default function ClientDistributionChart({
  data,
}: ClientDistributionChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        No client data available
      </div>
    )
  }

  const labels = data.map((d) => d.status)
  const seriesData = data.map((d) => d.count)

  // Color mapping for different statuses
  const colorMap: Record<string, string> = {
    Active: '#10b981',
    Inactive: '#94a3b8',
    Prospect: '#f59e0b',
  }

  const colors = data.map((d) => colorMap[d.status] || '#64748b')

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'Inter, sans-serif',
    },
    labels: labels,
    colors: colors,
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 500,
      labels: {
        colors: '#475569',
      },
      itemMargin: {
        horizontal: 12,
        vertical: 8,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 600,
      },
      dropShadow: {
        enabled: false,
      },
      formatter: (val, opts) => {
        return `${Math.round(val as number)}%`
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontWeight: 600,
              color: '#1e293b',
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '28px',
              fontWeight: 700,
              color: '#0f172a',
              offsetY: 10,
              formatter: (val) => String(val),
            },
            total: {
              show: true,
              label: 'Total Clients',
              fontSize: '14px',
              fontWeight: 600,
              color: '#64748b',
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce(
                  (a: number, b: number) => a + b,
                  0
                )
                return total.toString()
              },
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} clients`,
      },
      theme: 'light',
    },
    states: {
      hover: {
        filter: {
          type: 'lighten' as const,
        },
      },
    },
  }

  return (
    <div className="w-full flex items-center justify-center">
      <Chart options={options} series={seriesData} type="donut" height={320} />
    </div>
  )
}
