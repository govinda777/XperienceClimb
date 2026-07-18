'use client';

import React, { useState } from 'react';
import { Card, Button } from '@/components/ui';

interface Testimonial {
  name: string;
  age?: number;
  city?: string;
  package?: string;
  rating: number;
  comment: string;
  date?: string;
  experience: 'first-time' | 'beginner' | 'intermediate' | 'advanced';
}

interface TestimonialsSectionProps {
  cmsData?: {
    title?: string;
    description?: string;
    testimonials?: Array<{
      name: string;
      text: string;
      date?: string;
      experience?: string;
      rating?: number;
    }>;
  };
}

const defaultTestimonials: Testimonial[] = [
  {
    name: 'Ana Carolina',
    age: 28,
    city: 'São Paulo, SP',
    package: 'Intermediário',
    rating: 5,
    comment: 'Experiência incrível! Foi minha primeira vez escalando e me senti super segura. Os instrutores são muito atenciosos e o local é deslumbrante. Já quero voltar!',
    date: '2024-01-15',
    experience: 'first-time'
  },
  {
    name: 'Roberto Silva',
    age: 35,
    city: 'Campinas, SP',
    package: 'Avançado',
    rating: 5,
    comment: 'O pacote avançado valeu cada centavo. A hospedagem, as refeições e principalmente a experiência de escalada foram perfeitas. Equipe profissional e local único!',
    date: '2024-01-10',
    experience: 'intermediate'
  },
  {
    name: 'Mariana Costa',
    age: 24,
    city: 'Sorocaba, SP',
    package: 'Básico',
    rating: 5,
    comment: 'Perfeito para iniciantes! Me senti super acolhida e segura. O instrutor teve muita paciência para ensinar as técnicas. Vista incrível lá de cima!',
    date: '2024-01-08',
    experience: 'first-time'
  }
];

const experienceLabels = {
  'first-time': 'Primeira vez',
  'beginner': 'Iniciante',
  'intermediate': 'Intermediário',
  'advanced': 'Avançado'
};

export function TestimonialsSection({ cmsData }: TestimonialsSectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [filter, setFilter] = useState<'all' | 'first-time' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const title = cmsData?.title || "O Que Nossos Aventureiros Dizem";
  const description = cmsData?.description || "Mais de 500 pessoas já viveram essa experiência única. Confira alguns dos depoimentos dos nossos escaladores!";

  // Map CMS testimonials to match our UI state schema
  const testimonialsToRender: Testimonial[] = cmsData?.testimonials
    ? cmsData.testimonials.map((t, _idx) => ({
        name: t.name,
        rating: t.rating || 5,
        comment: t.text,
        date: t.date || '2026-01-01',
        experience: (t.experience as any) || 'first-time',
        city: 'São Paulo, SP',
        package: 'Especial'
      }))
    : defaultTestimonials;

  const filteredTestimonials = filter === 'all' 
    ? testimonialsToRender
    : testimonialsToRender.filter(t => t.experience === filter);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === filteredTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const currentTest = filteredTestimonials[currentTestimonial];

  if (!currentTest) {
    return null;
  }

  return (
    <section id="depoimentos" className="py-20 bg-gradient-to-br from-orange-50 to-climb-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-climb-600 mb-6">
            {title}
          </h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todas
          </Button>
          <Button
            variant={filter === 'first-time' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('first-time')}
          >
            Primeira vez
          </Button>
          <Button
            variant={filter === 'beginner' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('beginner')}
          >
            Iniciante
          </Button>
          <Button
            variant={filter === 'intermediate' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('intermediate')}
          >
            Intermediário
          </Button>
          <Button
            variant={filter === 'advanced' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('advanced')}
          >
            Avançado
          </Button>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-climb-500/5 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-400/5 rounded-full translate-y-8 -translate-x-8"></div>
            
            <div className="relative z-10">
              <div className="text-6xl text-climb-500/20 mb-6 leading-none">&ldquo;</div>
              
              <div className="flex items-center justify-center space-x-1 mb-6">
                {[...Array(currentTest.rating)].map((_, i) => (
                  <span key={i} className="text-lg text-yellow-400">⭐</span>
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-neutral-700 text-center leading-relaxed mb-8 italic">
                {currentTest.comment}
              </blockquote>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-climb-500 to-climb-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {currentTest.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-climb-600">{currentTest.name}</h4>
                    {currentTest.age && <p className="text-neutral-600">{currentTest.age} anos • {currentTest.city}</p>}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {currentTest.package && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                      Pacote {currentTest.package}
                    </span>
                  )}
                  <span className="px-3 py-1 bg-climb-100 text-climb-600 rounded-full text-sm font-medium">
                    {experienceLabels[currentTest.experience]}
                  </span>
                  {currentTest.date && (
                    <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm">
                      {new Date(currentTest.date).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full p-0"
          >
            ←
          </Button>
          
          <div className="flex space-x-2">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-climb-500 w-8' 
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full p-0"
          >
            →
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-climb-600 mb-2">500+</div>
            <div className="text-sm text-neutral-600">Escaladores</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-orange-400 mb-2">4.9</div>
            <div className="text-sm text-neutral-600">Avaliação Média</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-green-500 mb-2">98%</div>
            <div className="text-sm text-neutral-600">Recomendariam</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-purple-500 mb-2">60%</div>
            <div className="text-sm text-neutral-600">Voltaram</div>
          </div>
        </div>
      </div>
    </section>
  );
}
