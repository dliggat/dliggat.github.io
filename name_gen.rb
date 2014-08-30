#!/usr/bin/env ruby
# Helper script for 'everyone-should-use-twitter'.

def brackety(list)
  list.map { |x| "[@#{x}][@#{x}]"}.join(', ')
end

def listy(list)
  list.map { |x| "[@#{x}]: https://twitter.com/#{x}" }.each { |y| puts y }
end

topics = { 'Canadian-focus' => %w[acoyne MikePMoffatt stephenfgordon],
           'News'           => %w[guardian BreakingNews CBCNews BBCNews TheTyee],
           'Economics'      => %w[TheEconomist TimHarford Pricenomics planetmoney],
           'Finance'        => %w[felixsalmon dealbook CdnCouchPotato],
           'Tech'           => %w[pmarca BenedictEvans monkbent fmanjoo gruber troyhunt],
           'Urbanism'       => %w[StrongTowns neil21 modacitylife copenhagenize],
           'Miscellaneous'  => %w[mathbabedotorg TheOnion StatFact RealTimeWWII] }

topics.each { |k, v| puts "* #{k}: " + brackety(v) }

puts
puts '----'
puts

topics.each { |_, v| listy v }
