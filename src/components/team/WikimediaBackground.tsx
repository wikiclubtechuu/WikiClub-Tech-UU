const WikimediaBackground = () => (
  <>
    <div className='pointer-events-none absolute inset-0 overflow-hidden'>
      <div className='absolute inset-0' style={{ background: 'radial-gradient(circle at 15% 10%, rgba(210, 238, 250, 0.75) 0%, rgba(210, 238, 250, 0) 42%), radial-gradient(circle at 85% 10%, rgba(215, 250, 225, 0.8) 0%, rgba(215, 250, 225, 0) 45%), radial-gradient(circle at 80% 90%, rgba(255, 245, 235, 0.65) 0%, rgba(255, 245, 235, 0) 40%), #f8fcfa' }} />
    </div>
    <style>{`header .container > div > p:first-of-type { display: none !important; }`}</style>
  </>
);

export default WikimediaBackground;
