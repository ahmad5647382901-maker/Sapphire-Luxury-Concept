import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { Product, EditorialStory } from '../types';
import { NOIR_STRUCTURE_BAG, EDITORIAL_COLLECTIONS } from '../data/product';

interface SearchModalProps {
isOpen: boolean;
onClose: () => void;
products?: Product[];
stories?: EditorialStory[];
onSelectProduct: (product: Product) => void;
onSelectStory?: (story: EditorialStory) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
isOpen,
onClose,
products = [NOIR_STRUCTURE_BAG],
stories = EDITORIAL_COLLECTIONS,
onSelectProduct,
onSelectStory,
}) => {
const [query, setQuery] = useState('');
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
if (!isOpen) return;
const timer = setTimeout(() => inputRef.current?.focus(), 100);
return () => clearTimeout(timer);
}, [isOpen]);

useEffect(() => {
if (!isOpen) setQuery('');
}, [isOpen]);

const uniqueProducts = useMemo(() => {
return Array.from(
new Map(products.map((product) => [product.id, product])).values()
);
}, [products]);

const q = query.trim().toLowerCase();

const filteredProducts = useMemo(() => {
if (!q) return uniqueProducts;

return uniqueProducts.filter((product) =>  
  [  
    product.name,  
    product.tagline,  
    product.description,  
    product.color,  
    product.category,  
    product.collection,  
    product.type,  
    product.badge,  
    product.formattedPrice,  
  ]  
    .filter(Boolean)  
    .join(' ')  
    .toLowerCase()  
    .includes(q)  
);

}, [q, uniqueProducts]);

const filteredStories = useMemo(() => {
if (!q) return stories;

return stories.filter((story) =>  
  [  
    story.title,  
    story.subtitle,  
    story.edition,  
    story.category,  
    story.description,  
    story.label,  
    story.year,  
  ]  
    .filter(Boolean)  
    .join(' ')  
    .toLowerCase()  
    .includes(q)  
);

}, [q, stories]);

const selectProduct = (product: Product) => {
onClose();
onSelectProduct(product);
};

const selectStory = (story: EditorialStory) => {
onClose();
onSelectStory?.(story);
};

return (
<AnimatePresence>
{isOpen && (
<motion.div
className="fixed inset-0 z-[100] overflow-y-auto bg-[#11110f]/95 text-[#f3eee5]"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
>
<div className="mx-auto min-h-screen max-w-6xl px-5 py-6 sm:px-8 lg:px-12">
<header className="flex items-center justify-between border-b border-white/10 pb-5">
<div>
<p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
SAPPHIRE
</p>
<h1 className="mt-1 font-serif text-2xl">
Search the collection
</h1>
</div>

<button  
            onClick={onClose}  
            className="flex h-11 w-11 items-center justify-center border border-white/10"  
            aria-label="Close search"  
          >  
            <X size={18} />  
          </button>  
        </header>  

        <div className="mx-auto mt-10 max-w-4xl">  
          <div className="flex items-center border-b border-white/25 pb-4">  
            <Search className="mr-4 text-white/50" size={22} />  

            <input  
              ref={inputRef}  
              value={query}  
              onChange={(e) => setQuery(e.target.value)}  
              placeholder="Search products, collections, materials..."  
              className="w-full bg-transparent font-serif text-2xl outline-none placeholder:text-white/25 sm:text-4xl"  
            />  

            {query && (  
              <button onClick={() => setQuery('')} aria-label="Clear search">  
                <X size={18} />  
              </button>  
            )}  
          </div>  

          <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-white/35">  
            {q  
              ? `${filteredProducts.length + filteredStories.length} results`  
              : 'Explore SAPPHIRE'}  
          </p>  
        </div>  

        <main className="mx-auto mt-14 pb-20">  
          {filteredProducts.length > 0 && (  
            <section>  
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">  
                Products  
              </p>  

              <h2 className="mt-2 border-b border-white/10 pb-4 font-serif text-3xl">  
                Objects  
              </h2>  

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">  
                {filteredProducts.map((product) => (  
                  <button  
                    key={product.id}  
                    onClick={() => selectProduct(product)}  
                    className="group text-left"  
                  >  
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e1d6]">  
                      <img  
                        src={product.images[0]?.url}  
                        alt={product.images[0]?.alt || product.name}  
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"  
                      />  

                      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-black opacity-0 transition group-hover:opacity-100">  
                        <ArrowUpRight size={15} />  
                      </span>  
                    </div>  

                    <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-white/35">  
                      {product.category}  
                    </p>  

                    <h3 className="mt-2 font-serif text-xl">  
                      {product.name}  
                    </h3>  

                    <p className="mt-2 text-xs text-white/45">  
                      {product.formattedPrice}  
                    </p>  
                  </button>  
                ))}  
              </div>  
            </section>  
          )}  

          {filteredStories.length > 0 && (  
            <section className="mt-20">  
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">  
                Anthology  
              </p>  

              <h2 className="mt-2 border-b border-white/10 pb-4 font-serif text-3xl">  
                Editorial Collections  
              </h2>  

              <div className="mt-6 grid gap-8 md:grid-cols-3">  
                {filteredStories.map((story) => (  
                  <button  
                    key={story.id}  
                    onClick={() => selectStory(story)}  
                    className="group text-left"  
                  >  
                    <div className="aspect-[4/5] overflow-hidden bg-[#e8e1d6]">  
                      <img  
                        src={story.image}  
                        alt={story.title}  
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"  
                      />  
                    </div>  

                    <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-white/35">  
                      {story.label || story.edition || 'Collection'}  
                    </p>  

                    <h3 className="mt-2 font-serif text-2xl">  
                      {story.title}  
                    </h3>  
                  </button>  
                ))}  
              </div>  
            </section>  
          )}  

          {q &&  
            filteredProducts.length === 0 &&  
            filteredStories.length === 0 && (  
              <div className="py-24 text-center">  
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">  
                  No results  
                </p>  

                <h2 className="mt-4 font-serif text-3xl">  
                  Nothing found for “{query}”  
                </h2>  
              </div>  
            )}  
        </main>  
      </div>  
    </motion.div>  
  )}  
</AnimatePresence>

);
};

export default SearchModal;
