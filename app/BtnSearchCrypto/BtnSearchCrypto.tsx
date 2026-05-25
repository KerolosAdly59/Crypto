import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

const BtnSearchCrypto = () => {
    function searchCrypto() {
    console.log("Search for a cryptocurrency...")
  }
  return (
    <div>
      <Field onClick={searchCrypto}>
          <div className="relative w-full max-w-sm ">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />

            <Input
              type="text"
              placeholder="search for a cryptocurrency..."
              className="pl-10 border border-gray-800"
            />

          </div>
        </Field>
    </div>
  )
}

export default BtnSearchCrypto
