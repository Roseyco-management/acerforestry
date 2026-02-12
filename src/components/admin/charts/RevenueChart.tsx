'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface RevenueChartProps {
  data: Array<{
    month: string
    revenue: number
    projectCount: number
  }>
}

export default function RevenueChart({ data }: RevenueChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        No revenue data available
      </div>
    )
  }

  // Format month labels (YYYY-MM to Month Year)
  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })
  }

  const categories = data.map((d) => formatMonth(d.month))
  const revenueData = data.map((d) => Math.round(d.revenue))

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
      fontFamily: 'Inter, sans-serif',
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '60%',
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#2D5F3F'],
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px',
        },
        rotate: -45,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px',
        },
        formatter: (value) => `£${(value / 1000).toFixed(0)}k`,
      },
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `£${value.toLocaleString()}`,
      },
      theme: 'light',
    },
    states: {
      hover: {
        filter: {
          type: 'darken' as const,
        },
      },
    },
  }

  const series = [
    {
      name: 'Revenue',
      data: revenueData,
    },
  ]

  return (
    <div className="w-full">
      <Chart options={options} series={series} type="bar" height={320} />
    </div>
  )
}
