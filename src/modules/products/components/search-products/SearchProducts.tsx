import Image from 'next/image'
import React from 'react'
import './styles.scss'

interface Props {
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function SearchProducts({ onInputChange, className }: Props) {
  return (
    <div className={`search-bar ${className}`}>
      <input type="text" placeholder='Rechercher' onChange={onInputChange} />
      <Image src='/icons/search.png' alt='search' width={30} height={30} />
    </div>
  )
}
