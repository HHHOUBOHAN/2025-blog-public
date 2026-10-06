'use client'

import type { SiteContent } from '../../stores/config-store'

interface BeianFormProps {
	formData: SiteContent
	setFormData: React.Dispatch<React.SetStateAction<SiteContent>>
}

export function BeianForm({ formData, setFormData }: BeianFormProps) {
	const list = formData.beian || []

	const updateItem = (index: number, patch: Partial<{ text: string; link: string }>) => {
		setFormData({
			...formData,
			beian: list.map((item, i) => (i === index ? { ...item, ...patch } : item))
		})
	}

	const addItem = () => {
		setFormData({
			...formData,
			beian: [...list, { text: '', link: '' }]
		})
	}

	const removeItem = (index: number) => {
		setFormData({
			...formData,
			beian: list.filter((_, i) => i !== index)
		})
	}

	return (
		<div className='space-y-2'>
			<div className='mb-2 flex items-center justify-between'>
				<label className='block text-sm font-medium'>备案信息</label>
				<button type='button' onClick={addItem} className='bg-card rounded-lg border px-3 py-1 text-xs font-medium'>
					+ 添加备案
				</button>
			</div>
			{list.length === 0 && <div className='text-xs text-gray-400'>暂无备案信息，点击右上角「添加备案」</div>}
			{list.map((item, index) => (
				<div key={index} className='grid grid-cols-[1fr_1fr_auto] items-end gap-2'>
					<div>
						<label className='mb-1 block text-xs text-gray-600'>备案号</label>
						<input
							type='text'
							value={item.text || ''}
							onChange={e => updateItem(index, { text: e.target.value })}
							placeholder='例如：京ICP备12345678号'
							className='bg-secondary/10 w-full rounded-lg border px-4 py-2 text-sm'
						/>
					</div>
					<div>
						<label className='mb-1 block text-xs text-gray-600'>备案链接（可选）</label>
						<input
							type='url'
							value={item.link || ''}
							onChange={e => updateItem(index, { link: e.target.value })}
							placeholder='https://beian.miit.gov.cn/'
							className='bg-secondary/10 w-full rounded-lg border px-4 py-2 text-sm'
						/>
					</div>
					<button type='button' onClick={() => removeItem(index)} className='bg-card rounded-lg border px-3 py-2 text-xs font-medium text-red-500'>
						删除
					</button>
				</div>
			))}
		</div>
	)
}