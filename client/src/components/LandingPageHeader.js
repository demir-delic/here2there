export default function LandingPageHeader(props) {
    return (
        <div className='bg-gray-50'>
            <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
                <div className='text-center'>
                    <p className='mt-5 mx-auto max-w-prose text-xl text-gray-500'>
                        Looks like you're somewhere near
                        <span className='font-semibold text-green-600'>
                            {` ${props.userCity} ${props.userCountry}`}
                        </span>
                    </p>
                    <p className='max-w-xl mt-5 mx-auto text-2xl'>
                        What should your next vacation destination be like
                        compared to{' '}
                        <span className='font-semibold text-green-600'>{` ${props.userCity}?`}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
