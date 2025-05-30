// client/src/pages/Home.tsx

import React, { useEffect } from 'react';
import { useJobStore } from '../store/useJobStore';
import JobCard from '../components/JobCard';
import SearchBar from "../components/SearchBar";

const Home: React.FC = () => {
  const { jobs, isLoading, fetchJobs, hasMore } = useJobStore();

  useEffect(() => {
    if (jobs.length === 0) {
      void fetchJobs();
    }
  }, [jobs.length, fetchJobs]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight * 0.9;

      if (isNearBottom && !isLoading && hasMore) {
        void fetchJobs();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchJobs, isLoading, hasMore]);

  return (
    <div className="px-4 sm:px-6 md:px-10 space-y-6">
      <SearchBar />

      {isLoading && jobs.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Loading jobs...
        </div>
      )}

      {jobs.length === 0 && !isLoading && (
        <div className="text-center text-gray-600 dark:text-gray-400">
          No jobs found.
        </div>
      )}

      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          company={job.company}
          location={job.location}
          description={job.description}
          summary={job.summary}
          applyLink={job.applyLink}
          salaryMin={job.salaryMin}
          salaryMax={job.salaryMax}
          salaryPeriod={job.salaryPeriod}
          benefits={job.benefits}
          postedAt={job.postedAt ?? undefined}
          logoUrl={job.logoUrl}
        />
      ))}

      {isLoading && jobs.length > 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Loading more jobs...
        </div>
      )}
    </div>
  );
};

export default Home;
